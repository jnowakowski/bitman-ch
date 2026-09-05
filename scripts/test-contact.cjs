const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const code=readFileSync(require('node:path').join(__dirname,'../assets/contact.js'),'utf8');
function setup(host='bitman.ch') {
 const callbacks=[];
 const window={};
 const context={window,URL,location:{hostname:host,origin:'https://'+host,pathname:'/en/',href:'https://'+host+'/en/?private=not-for-events'},document:{documentElement:{lang:'en'},addEventListener:(name,fn)=>callbacks.push(fn)}};
 vm.createContext(context);vm.runInContext(code,context);vm.runInContext(code,context);
 return {window,callbacks,click(href,service){const link={href,closest:()=>service?{dataset:{service}}:null};for(const fn of callbacks)fn({target:{closest:()=>link}})}};
}
for(const host of ['localhost','127.0.0.1','bitman-ch.jnowakowski.workers.dev','bitman.ch.example.com']) assert.equal(setup(host).callbacks.length,0);
for(const host of ['bitman.ch','www.bitman.ch']){
 const s=setup(host);assert.equal(s.callbacks.length,1);
 s.click('https://cloudindustry.ch/');assert.equal(s.window.dataLayer.length,0);
 for(const [href,method] of [['mailto:kontakt@bitman.ch?body=private','email'],['tel:+41787482377','phone'],['https://wa.me/41787482377?text=private','whatsapp']]){
  const before=s.window.dataLayer.length;s.click(href,'integration');assert.equal(s.window.dataLayer.length,before+1);
  const [command,event,params]=s.window.dataLayer.at(-1);assert.equal(command,'event');assert.equal(event,'contact_click');assert.equal(params.contact_method,method);assert.equal(params.send_to,'G-16TNFTJZJJ');assert.equal(params.service,'integration');assert.equal(params.page_location,'https://'+host+'/en/');assert.ok(!JSON.stringify(params).includes('private'));
 }
 s.click('https://wa.me.evil.example/123');assert.equal(s.window.dataLayer.length,3);
 s.click('mailto:kontakt@bitman.ch','user supplied text');assert.equal(s.window.dataLayer.at(-1)[2].service,'general');
}
console.log('PASS: contact methods, one handler/event, production hosts, destination routing, no query/message payload, service allowlist');
