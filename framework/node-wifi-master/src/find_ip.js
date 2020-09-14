const os = require('os');
const dgram = require('dgram');
const { exec } = require('child_process');

class telloTeamScan{
  constructor(server, scan_num, scan_timeout, indexwithsn){
      this.alive_host = {};
      this.alive_tello = {};
      this.alive_tello_IP = {};
      this.tellos = {};
      this.index = 0;

      this.PORT = 8889;
      this.IP_CONST = "";
      this.IP_ARR_CONST = [];

      this.udpServer = null;
      this.udpServer_parent = server;
      this.costtime= 0;
      this.timer = 0;
      this.result_num = 0;
      this.scan_num = scan_num*1 || 1;
      this.scan_timeout = scan_timeout?scan_timeout*1000:0;
      this.continueLoop = true;
      this.indexwithsn = indexwithsn || {};
  }

  // 获取本机ip，优先获取以太网或wlan
  getIPAdress() {
      let interfaces = os.networkInterfaces();
      let results = {wlan: [], other: []};
      for (let devName in interfaces) {
          let iface = interfaces[devName];
          for (let i = 0; i < iface.length; i++) {
              let alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  if(devName.match(/wlan/i)){
                    results.wlan.push(alias.address);
                  }else{
                    results.other.push(alias.address);
                  }
              }
          }
      }
      console.log(JSON.stringify(results));
      // return results[type] ||  results['all'];
      // 优先查找wlan下的tello
      return results.wlan.concat(results.other);
  }

  // 获取设备SN
  get_Tello(host){
    if(!this.udpServer) return;
    const BUFSIZ = 1024;
    // console.log("host==", host);
    let msg = new Buffer("command");
    this.udpServer.send(msg, 0, msg.length, this.PORT, host);

    let msg2 = new Buffer('sn?');
    this.udpServer.send(msg2, 0, msg2.length, this.PORT, host);

    let msg3 = new Buffer('ssid?');
    this.udpServer.send(msg3, 0, msg3.length, this.PORT, host);

    this.index++;

    // 255个IP扫描结束以后，若result_num为0，开启下一个网段扫描
    if( this.index && !(this.index%255) && !this.result_num){
      // result_num
      this.deal_multi();
    }
  }

  // 通过cmd查询tello的设备SN
  ping_ip(ip_str){
      // console.log("ping '+ip_str==", 'ping '+ip_str);
      return new Promise((resolve, reject)=>{
        exec('ping -a '+ip_str, (err, stdout)=>{
            stdout = stdout.toString();
            // console.log("stdout===", stdout);
            if(stdout.match(/TTL/i)){
                this.alive_host[ip_str] = ip_str;
                this.continueLoop && this.get_Tello(ip_str);
                // pingFun.kill();
            }else{
                this.index++;
                // 255个IP扫描结束以后，若result_num为0，开启下一个网段扫描
                if( this.index && !(this.index%255) && !this.result_num){
                  // result_num
                  this.deal_multi();
                }
            }
        });
          /*let pingFun = childProcess.spawn('ping', ["-a", ip_str]);
          pingFun.stdout.on('data', stdout => {
              stdout = stdout.toString();
              if(stdout.match(/TTL/i)){
                  this.alive_host[ip_str] = ip_str;
                  this.continueLoop && this.get_Tello(ip_str);
                  pingFun.kill();
              }else if(stdout.match(ip_str)){
                  this.index++;
                  // 255个IP扫描结束以后，若result_num为0，开启下一个网段扫描
                  if( this.index && !(this.index%255) && !this.result_num){
                    // result_num
                    this.deal_multi();
                  }
              }
              // console.log(`stderr: ${data}`);
          })*/
      })
  }


  // 多IP查询  多个
  deal_multi() {
    if(!this.IP_ARR_CONST.length) {
      console.error('connect network first');
      reject('connect network first');
      this.closeUdpserver();
      return;
    }

    let index = this.IP_ARR_CONST.indexOf(this.IP_CONST);
    if(index == this.IP_ARR_CONST.length-1){
       console.log('scan finished, total: ', index+1, this.index);
       return;
    }

    index = index == -1 ? 0 : index+1;
    this.IP_CONST = this.IP_ARR_CONST[index];

    console.log("start scan", index, this.index);
    console.log("IP_CONST, result_num===", this.IP_CONST, this.result_num);

    if(!this.IP_CONST) {
      console.error('IP_CONST error', IP_CONST);
      reject('connect network first');
      this.closeUdpserver();
      return;
    }


    let baseIP = this.IP_CONST.split('.').slice(0, -1).join(".")+'.';
    console.log("baseIP===", this.IP_CONST);

    for(let i = 1;i <= 255;i++){
        let query_ip = baseIP+i;
        if(query_ip != this.IP_CONST){
            setTimeout(()=>{
              this.continueLoop && this.ping_ip(query_ip);
            }, 50);
        }else{
          this.index++;

          // 255个IP扫描结束以后，若result_num为0，开启下一个网段扫描
          if( this.index && !(this.index%255) && !this.result_num){
            // result_num
            this.deal_multi();
          }
        }
    }
  }

  // 入口，读取局域网下的设备（端口1-255）
  startScan(){
    return new Promise((resolve, reject)=>{
        // 超时从查询存活开始，而不是测试连接tello
        if(this.scan_timeout) {
          this.scanTimeoutTimer = setTimeout(()=>{
            console.log("scan is broke with time...", this.scan_timeout);
            resolve(this.alive_tello);
            this.closeUdpserver();
          }, this.scan_timeout)
        }

        this.costtime= new Date().getTime();
        this.IP_ARR_CONST = this.getIPAdress();
        this.udpServer = this.udpServer_parent || dgram.createSocket('udp4');

        this.timer = setInterval(()=>{
            this.timerCount = this.timerCount?++this.timerCount:1;
            if(/*this.index == 255 || */this.timerCount > 1000000){
                resolve(this.alive_tello);
                this.closeUdpserver();
            }else if(this.scan_num && this.result_num >= this.scan_num){
              console.log("scan is broke with nums...", this.scan_num);
              resolve(this.alive_tello);
              this.closeUdpserver();
            }
        }, 10);

        this.udpServer.on('message', (msg, rinfo)=>{
            // 接收udp消息处，通过IP统计是否为tello
            if(rinfo.address == this.IP_CONST) return;
            msg = msg.toString();
            if(msg && !msg.match(/ok|error|command|sn|ssid|\?|unknown/) ){
                this.tellos[rinfo.address] = {
                        sn: msg,
                        name: this.alive_host[rinfo.address]
                }
                // this.tellos[ip_str] = hostname;
                // 只获取查询的sn码对应的IP
                if(this.indexwithsn[msg] && this.result_num < this.scan_num) {
                  if(!this.alive_tello[this.indexwithsn[msg]]) this.result_num++;
                  this.alive_tello[this.indexwithsn[msg]] = {IP: rinfo.address, SN: msg};
                  this.alive_tello_IP[rinfo.address] = {sn: msg, index: this.indexwithsn[msg]};
                }
            }
        })

        this.udpServer.on('error', (error)=>{
          reject(error);
        })

        if(!this.udpServer_parent) this.udpServer.bind(this.PORT);
        this.deal_multi();
    })
  }

  closeUdpserver(){
    clearInterval(this.timer);
    clearTimeout(this.scanTimeoutTimer);
    let endtime= new Date().getTime();
    this.costtime = (endtime-this.costtime)/1000;
    this.continueLoop = false;
    console.log('time', this.costtime);

    if(this.udpServer_parent) return;
     this.udpServer.removeAllListeners();
     setTimeout(()=>{
       this.udpServer.close();
       this.udpServer = null;
     }, 1000);
     console.log('close');
  }

}

module.exports = telloTeamScan;
