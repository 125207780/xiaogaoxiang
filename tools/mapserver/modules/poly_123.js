_jsload2&&_jsload2('poly', 'function Od(a,b){Q.call(this);this.O=a;this.type=b;this.w={}}t.lang.ia(Od,Q,"Vertex"); t.extend(Od.prototype,{initialize:function(a){this.map=a;var b="",b=this.type?"BMap_vectex BMap_vectex_nodeT":"BMap_vectex BMap_vectex_node",c=this.Cv=this.J=document.createElement("div");c.className=b;a.Ke().BJ.appendChild(c);this.Iq();return c},draw:function(){var a=this.map.Pe(this.O);this.Cv.style.left=a.x-5+"px";this.Cv.style.top=a.y-5+"px"},ga:function(a){a instanceof F&&(this.O=this.w.O=new F(a.lng,a.lat),this.draw())},aa:s("O"),Iq:function(){function a(a,b){b.pixel=b.Oa=a.Oa;b.point=b.O=a.O; return b}function b(a){var b=a.clientX,c=a.clientY;a.changedTouches&&(b=a.changedTouches[0].clientX,c=a.changedTouches[0].clientY);return new O(b,c)}if(this.J&&!this.J.Jf){this.J.Jf=i;var c=this.map,d=this,e=0,f=0,g=0,j={x:0,y:0};this.Fl=function(a){ka(a);if(2!=a.button){d.Dh=i;var j=c.jb(d.O),m=b(a);e=m.x-j.x;f=m.y-j.y;g=Ea();d.map.D.bn=d;t.C(document,"mousemove",d.dg);t.C(document,"mouseup",d.cg);t.C(document,"touchmove",d.dg);t.C(document,"touchend",d.cg);d.J&&d.J.setCapture&&d.J.setCapture(); d.J.style.cursor=d.w.kc;"touchstart"==a.type&&A(a)}};this.dg=function(g){if(d.Dh){g=b(g);j=g=new O(g.x-e,g.y-f);d.oq=g;var l=d.map.Ta(g),m={Oa:g,O:l};d.Mh=d.Nh=0;if(20>=g.x||g.x>=d.map.width-20||50>=g.y||g.y>=d.map.height-10){if(20>=g.x?d.Mh=8:g.x>=d.map.width-20&&(d.Mh=-8),50>=g.y?d.Nh=8:g.y>=d.map.height-10&&(d.Nh=-8),!d.Zc)d.Zc=setInterval(function(){c.oe(d.Mh,d.Nh,{noAnimation:i});var a=c.Ta(d.oq);d.ga(a)},30)}else d.Zc&&(clearInterval(d.Zc),d.Zc=n),d.ga(l);d.wh||(d.dispatchEvent(a(m,new L("ondragstart"))), d.wh=i);d.dispatchEvent(a(m,new L("ondragging")))}};this.cg=function(){d.J&&d.J.releaseCapture&&d.J.releaseCapture();d.Dh=o;d.map.D.bn=n;t.Tc(document,"mousemove",d.dg);t.Tc(document,"mouseup",d.cg);t.Tc(document,"touchmove",d.dg);t.Tc(document,"touchend",d.cg);e=f=0;d.Zc&&(clearInterval(d.Zc),d.Zc=n);if(100<=Ea()-g&&(2<j.x||2<j.y))d.wh=o,d.dispatchEvent(a({Oa:d.map.jb(d.aa()),O:d.aa()},new L("ondragend"))),j.x=j.y=0;d.Uh();d.J&&(d.J.style.cursor=d.w.rd?"pointer":"")};t.C(this.J,"mousedown",this.Fl); t.C(this.J,"touchstart",this.Fl)}}});t.extend(Fb.prototype,{initialize:function(a){a&&this.mn&&a.addEventListener("onmousemove",this.mn);a=Q.prototype.initialize.call(this,a);this.w.Td==i&&(this.Jg(),this.Xh());return a},zk:function(){this.J=(this.fn=Pd.Nl(this.map)).Bj()},N:function(){function a(a,b){var c=a.srcElement||a.target,g=db(),j=a.pageX?a.pageX:a.clientX+g[1],g=a.pageY?a.pageY:a.clientY+g[0];if(a&&b&&j&&g&&c){var c=t.lang.Kc(c.L).map,k=t.z.aa(c.xa);b.Oa=new O(j-k.left,g-k.top);b.O=c.Ta(b.Oa);b.pixel=b.Oa;b.point=b.O}return b} var b=this.J,c=this;"canvas"!=Pd.Nl(this.map).Oj()&&!I()&&(c.w.rd&&(b.style.cursor="pointer",t.C(b,"click",function(b){c.lw&&c.lw.pb(c.map.Fa())&&c.dispatchEvent(a(b,z(new L("onclick"),b)))}),t.C(b,"dblclick",function(b){c.dispatchEvent(a(b,z(new L("ondblclick"),b)))}),(!t.M.qf||4>t.M.qf)&&t.C(this.J,"contextmenu",function(b){c.dispatchEvent(a(b,z(new L("onrightclick"),b)))})),t.C(b,"mousedown",function(b){c.dispatchEvent(a(b,z(new L("onmousedown"),b)));c.lw=c.map.Fa()}),t.C(b,"mouseup",function(b){c.dispatchEvent(a(b, z(new L("onmouseup"),b)))}),t.C(this.J,"mouseup",function(b){c.dispatchEvent(a(b,z(new L("onmouseup"),b)));t.M.qf>=4&&(b.button==2&&c.w.rd)&&c.dispatchEvent(a(b,z(new L("onrightclick"),b)))}));b=n;this.Jf||(this.Jf=i,this.mn=function(a){if(c.map&&!c.map.D.bn){var b=c.DC(a.O),f=parseFloat(b.qa),g;if(f<c.w.uz){g=c.pa.Vo?new L("onmousemove"):new L("onmouseover");c.pa.Zy=o;c.pa.Vo=i}else if(!c.pa.Zy&&c.pa.Vo){g=new L("onmouseout");c.pa.Vo=o;c.pa.Zy=i}if(g){if(!(c instanceof Ob)&&g.type=="onmousemove"&& c.pa.Vo==i&&(f==0||f>c.w.uz)){g.pixel=g.Oa=a.Oa;g.point=g.O=a.O}else{g.point=g.O=this.Fz(b.Oa);g.pixel=g.Oa=this.jb(g.O)}c.dispatchEvent(g)}}},this.map.addEventListener("onmousemove",this.mn),this.addEventListener("mouseover",p()),this.addEventListener("mouseout",p()))},draw:function(){this.J&&this.fn&&this.fn.Rc(this.J,this.xq(this.W))},Sb:function(){this.map&&(this.initialize(this.map),this.J.style.WebkitUserSelect="none",this.draw())},xq:function(a){var b=this.map,c=[];if(0==a.length||!this.J|| !this.kg())return[c];if(!this.w.Td){var d=this.zi(b.T());this.od[d]?a=this.od[d]:(a=Qd(a,this.Tg(b.T())),a=this.od[d]=a)}d=this.w.xJ;c.push(b.Pe(a[0],n,d));for(var e=1,f=1,g=a.length;e<g;e++){var j=b.Pe(a[e],n,d);j.pb(c[f-1])||(c.push(j),f++)}return[c]},zi:function(a){return this.w.zi?this.w.zi(a):6>a?0:10>a?1:15>a?2:3},Tg:function(a){return this.w.Tg?this.w.Tg(a):Fb.Ut[this.zi(a)]},ml:function(a){this.od.length=0;a=Fb.Jo(a);this.xj=a.slice(0,a.length-1);this.W=a.slice(0);this.Xe();this.draw();this.dispatchEvent(new L("onlineupdate"))}, Rc:function(a){this.ml(a);this.w.Td==i&&(this.Jg(),this.Xh())},Vi:function(a,b){b&&this.W[a]&&(this.od.length=0,this.W[a]=new F(b.lng,b.lat),this.Xe(),this.w.Td==i&&(this.Jg(),this.Xh()),this.draw(),this.dispatchEvent(new L("onlineupdate")))},setStrokeColor:function(a){this.w&&(this.w.strokeColor=a);this.Ph("strokecolor",a)},vm:function(a){0<a&&(this.w.Te=a,this.Ph("strokeweight",a),"dashed"==this.Ay()&&(this.map&&"svg"==Pd.Nl(this.map).Oj())&&this.Ph("strokestyle","dashed"))},tm:function(a){a==aa|| (1<a||0>a)||(this.w.se=a,this.map&&this.Ph("strokeopacity",a))},qp:function(a){1<a||0>a||(this.w.qi=a,this.Ph("fillopacity",a))},um:function(a){"solid"!=a&&"dashed"!=a||(this.w.strokeStyle=a,this.Ph("strokestyle",a))},setFillColor:function(a){this.w.fillColor=a||"";this.Ph("fillcolor",a)},Ph:function(a,b){this.fn&&(this.fn.setAttribute(this.J,a,b||"",this.By()),this.dispatchEvent(new L("onlineupdate")))},Xh:function(){var a=this;if(!a.lb.length)for(var b=this.Dy(),c=0,d=b.length;c<d;c++){var e=b[c], f=new Od(e.Wa,e.Sc);f.addEventListener("ondragging",function(b){a.Fn(b)});f.addEventListener("ondragstart",p());f.addEventListener("ondragend",function(b){a.$q(b)});f.index=c;f.Sc=e.Sc;this.lb.push(f);this.map.Ua(f)}},Jg:function(){for(var a;a=this.lb.pop();)this.map.Pc(a),delete a;this.lb.length=0},Dy:function(){for(var a=[],b=0,c=this.W.length;b<c;b++){var d=this.W[b];a.push({Wa:d,Sc:0});if(b<c-1){var e=this.W[b+1],d=new F((d.lng+e.lng)/2,(d.lat+e.lat)/2);a.push({Wa:d,Sc:1})}}return this.Hb=a}, $J:p(),$q:function(a){this.pa.ag&&(this.map.Pc(this.pa.ag),delete this.pa.ag);this.pa.Bf&&(this.map.Pc(this.pa.Bf),delete this.pa.Bf);this.pa.yf&&(this.map.Pc(this.pa.yf),delete this.pa.yf);var b=a.O,a=a.currentTarget.index,c;if(0!=a%2){this.mq(a);this.Ak(a,b,0);var d=this.Hb[a-1].Wa;c=this.Hb[a+1].Wa;d=this.Ml(d,b);c=this.Ml(b,c);this.Ak(a,d,1);this.Ak(a+2,c,1);a=Math.ceil(a/2);c=this.W.slice();a=c.splice(a,this.W.length-a);c[c.length]=b;c=c.concat(a)}else this.Hb[a].Wa=b,0<=a-2&&(d=this.Hb[a-2].Wa, d=this.Ml(d,b),this.lb[a-1].show(),this.lb[a-1].ga(d)),a+2<this.Hb.length&&(c=this.Hb[a+2].Wa,c=this.Ml(b,c),this.lb[a+1].show(),this.lb[a+1].ga(c)),this instanceof Nb&&this.Hb.length-1==a&&(this.mq(0),this.Ak(0,b,0),this.mq(1),this.Ak(1,this.Ml(this.Hb[0].Wa,this.Hb[1].Wa),1),this.lb[0].J.style.zIndex="-10000000"),a/=2,this.W.splice(a,1,b),this instanceof Nb&&this.W.length-1==a&&this.W.splice(0,1,b),c=this.W;b=0;for(a=this.lb.length;b<a;b++)this.lb[b].index=b;this.W=c;this.ml(c)},Ak:function(a,b, c){var d=this;this.Hb.splice(a,0,{Wa:b,Sc:c});b=new Od(b,c);b.addEventListener("ondragging",function(a){d.Fn(a)});b.addEventListener("ondragstart",p());b.addEventListener("ondragend",function(a){d.$q(a)});b.index=a;b.Sc=c;this.lb.splice(a,0,b);this.map.Ua(b)},mq:function(a){this.map.Pc(this.lb[a]);this.Hb.splice(a,1);this.lb.splice(a,1)},Ml:function(a,b){return new F((a.lng+b.lng)/2,(a.lat+b.lat)/2)},DC:function(a){var b,c,d,e,f,g,j=[],k=this.map.Pe(a),j=this.xq(this.W)[0],l=j.length;if(1<l){for(e= 1;e<l;e++){var m=j[e-1],q=j[e];if(m&&q){m.x!=q.x?(f=(q.y-m.y)/(q.x-m.x),f=Math.abs(f*k.x+(q.y-f*q.x)-k.y)/Math.sqrt(f*f+1)):f=Math.abs(k.x-q.x);var u=Math.pow(q.y-m.y,2)+Math.pow(q.x-m.x,2),q=Math.pow(q.y-k.y,2)+Math.pow(q.x-k.x,2),m=Math.pow(m.y-k.y,2)+Math.pow(m.x-k.x,2),v=Math.pow(f,2);q-v+m-v>u&&(f=Math.sqrt(Math.min(q,m)));if(b==n||b>f)c=Math.sqrt(m-v)/Math.sqrt(u),d=Math.sqrt(q-v)/Math.sqrt(u),b=f,g=e;b=Math.min(b,f)}}if(!(this instanceof Ob)){f=k=0;u=this.W;for(e=0;e<l;e++)k=e==l-1?0:k+1,u[e].lat!= u[k].lat&&((a.lat>=u[e].lat&&a.lat<u[k].lat||a.lat>=u[k].lat&&a.lat<u[e].lat)&&a.lng<(u[k].lng-u[e].lng)*(a.lat-u[e].lat)/(u[k].lat-u[e].lat)+u[e].lng)&&f++;b=Math.min(b,0<f%2?0:b)}1<c&&(c=1);1<d&&(c=0);a=j[g-1].y-j[g].y;e=j[g-1].x-(j[g-1].x-j[g].x)*c;f=j[g-1].y-a*c}return{Oa:new O(e,f),qa:b}},show:function(){Q.prototype.show.call(this);this.draw();this.w.Td==i&&this.Xh()},H:function(){Q.prototype.H.call(this);this.w.Td==i&&this.Jg()},remove:function(){Db.prototype.remove.call(this);this.w.Td==i&& this.Jg()}});function Rd(a,b){var c={top:0,bottom:0,right:0,left:0,all:0},d=a.x,e=a.y;e<b.tz?(c.top=8,c.all+=c.top):e>b.pz&&(c.bottom=4,c.all+=c.bottom);d>b.oz?(c.right=2,c.all+=c.right):d<b.rz&&(c.left=1,c.all+=c.left);return c} function Qd(a,b){if(0==b)return a;for(var c=0,d=0,e=1,f=a.length-1;e<f;e++){var g;g=a[e];var j=a[0],k=a[a.length-1],l=j.lng-k.lng,k=j.lat-k.lat;0==l?g=Math.abs(g.lng-j.lng):0==k?g=Math.abs(g.lat-j.lat):(l=k/l,g=Math.abs(l*g.lng-g.lat+(j.lat-l*j.lng))/Math.sqrt(l*l+1));g>c&&(d=e,c=g)}g=[];if(c>=b){e=a.slice(0,d);f=a.slice(d,a.length);d=Qd(e,b);c=Qd(f,b);e=0;for(f=d.length;e<f;e++)g.push(d[e]);e=0;for(f=c.length;e<f;e++)g.push(c[e])}else g.push(a[0]),g.push(a[a.length-1]);return g} W(ad,{show:ad.show,hide:ad.H,remove:ad.remove,setPath:ad.Rc,setPositionAt:ad.Vi,setStrokeColor:ad.setStrokeColor,setStrokeWeight:ad.vm,setStrokeOpacity:ad.tm,setFillOpacity:ad.qp,setStrokeStyle:ad.um,setFillColor:ad.setFillColor});t.extend(Ob.prototype,{initialize:function(a){Fb.prototype.initialize.call(this,a);this.setFillColor("");this.setStrokeColor(this.w.strokeColor);this.vm(this.w.Te);this.um(this.w.strokeStyle);this.tm(this.w.se);return this.J},xq:function(a){var b=this.map,c=[];if(0==a.length||!this.J||!this.kg())return[c];if(!(I()&&5E3<a.length)&&!this.w.Td){var d=this.zi(b.T());if(this.od[d])a=this.od[d];else var e=Qd(a,this.Tg(b.T())),a=this.od[d]=e}c.push(b.Pe(a[0]));for(var f=d=1,e=a.length;d<e;d++){var g=b.Pe(a[d]); g.pb(c[f-1])||(c.push(g),f++)}a=[];d=b.offsetX;e=b.offsetY;f=b.G.ks;b={rz:-d-f,tz:-e-f,oz:-d+f+b.width,pz:-e+f+b.height};d=0;for(e=c.length-1;d<e;d++){var j=c[d],k=c[d+1],f=b,l=g=o,m=o,j=new O(j.x,j.y),k=new O(k.x,k.y),q=Rd(j,f),u=Rd(k,f),v=aa,y=aa,x=aa,E=f.rz,w=f.tz,H=f.oz,D=f.pz;do 0==q.all&&0==u.all?m=g=i:0!=(q.all&u.all)?m=i:(v=0!=q.all?q:u,v.top?(y=j.x+(k.x-j.x)*(w-j.y)/(k.y-j.y),x=w):v.bottom?(y=j.x+(k.x-j.x)*(D-j.y)/(k.y-j.y),x=D):v.right?(x=j.y+(k.y-j.y)*(H-j.x)/(k.x-j.x),y=H):v.left&&(x= j.y+(k.y-j.y)*(E-j.x)/(k.x-j.x),y=E),l=i,v.all==q.all)?(j.x=Math.round(y),j.y=Math.round(x),q=Rd(j,f)):(k.x=Math.round(y),k.y=Math.round(x),u=Rd(k,f));while(!m);f=g?{Jz:new O(j.x,j.y),Kz:new O(k.x,k.y),clip:l?i:o}:aa;f&&a.push(f)}c=[[]];d=0;for(e=a.length;d<e;d++)a[d].clip?(c[c.length-1].push(a[d].Jz),c[c.length-1].push(a[d].Kz),a[d+1]&&a[d+1].clip&&c.push([])):(c[c.length-1].push(a[d].Jz),d==a.length-1&&c[c.length-1].push(a[d].Kz));return c},Fn:function(a){var b=a.currentTarget,c=a.O,d=b.index,e= this.Hb,f,g=a=n;if(0==d){var j=e[d+2].Wa;f=[c,j];a=new F((j.lng+c.lng)/2,(j.lat+c.lat)/2);this.lb[d+1]&&this.lb[d+1].H()}else if(d==e.length-1){var k=e[d-2].Wa;f=[k,c];a=new F((k.lng+c.lng)/2,(k.lat+c.lat)/2);this.lb[d-1]&&this.lb[d-1].H()}else k=e[d-1].Wa,j=e[d+1].Wa,f=[k,c,j],b.Sc||(k=e[d-2].Wa,j=e[d+2].Wa,f=[k,c,j],a=new F((k.lng+c.lng)/2,(k.lat+c.lat)/2),g=new F((j.lng+c.lng)/2,(j.lat+c.lat)/2),this.lb[d-1]&&this.lb[d-1].H(),this.lb[d+1]&&this.lb[d+1].H());this.pa.ag?(this.pa.ag.Rc(f),this.pa.ag.show()): (b=new Ob(f,{strokeStyle:"dashed",strokeColor:this.w.strokeColor,Te:this.w.Te,se:this.w.se}),this.map.Ua(b),b.H(),this.pa.ag=b);!this.pa.Bf&&a?(this.pa.Bf=new Od(a,1),this.map.Ua(this.pa.Bf)):a&&this.pa.Bf.ga(a);!this.pa.yf&&g?(this.pa.yf=new Od(g,1),this.map.Ua(this.pa.yf)):g&&this.pa.yf.ga(g)}});t.extend(Nb.prototype,{initialize:function(a){Fb.prototype.initialize.call(this,a);this.setStrokeColor(this.w.strokeColor);this.vm(this.w.Te);this.um(this.w.strokeStyle);this.setFillColor(this.w.fillColor);this.tm(this.w.se);this.qp(this.w.qi);return this.J},Vi:function(a,b){this.xj[a]&&(this.od.length=0,this.xj[a]=new F(b.lng,b.lat),this.W[a]=new F(b.lng,b.lat),0==a&&!this.W[0].pb(this.W[this.W.length-1])&&(this.W[this.W.length-1]=new F(b.lng,b.lat)),this.Xe(),this.w.Td==i&&(this.Jg(),this.Xh()), this.draw(),this.dispatchEvent(new L("onlineupdate")))},Fn:function(a){var b=a.currentTarget,c=a.O,d=b.index,e=this.Hb,f,g=a=n;if(0==d){var j=e[e.length-2].Wa,k=e[d+2].Wa;f=[j,c,k];b.Sc||(a=new F((j.lng+c.lng)/2,(j.lat+c.lat)/2),g=new F((k.lng+c.lng)/2,(k.lat+c.lat)/2))}else d==e.length-1?(k=e[2].Wa,j=e[d-2].Wa,f=[j,c,k],b.Sc||(a=new F((j.lng+c.lng)/2,(j.lat+c.lat)/2),g=new F((k.lng+c.lng)/2,(k.lat+c.lat)/2))):(j=e[d-1].Wa,k=e[d+1].Wa,f=[j,c,k],b.Sc||(j=e[d-2].Wa,k=e[d+2].Wa,f=[j,c,k],a=new F((j.lng+ c.lng)/2,(j.lat+c.lat)/2),g=new F((k.lng+c.lng)/2,(k.lat+c.lat)/2),this.lb[d-1]&&this.lb[d-1].H(),this.lb[d+1]&&this.lb[d+1].H()));this.pa.ag?this.pa.ag.Rc(f):(b=new Ob(f,{strokeStyle:"dashed",strokeColor:this.w.strokeColor,Te:this.w.Te,se:this.w.se}),this.map.Ua(b),this.pa.ag=b);!this.pa.Bf&&a?(this.pa.Bf=new Od(a,1),this.map.Ua(this.pa.Bf)):a&&this.pa.Bf.ga(a);!this.pa.yf&&g?(this.pa.yf=new Od(g,1),this.map.Ua(this.pa.yf)):g&&this.pa.yf.ga(g)}});W(cd,{setPositionAt:cd.Vi});t.extend(Pb.prototype,{initialize:function(a){Nb.prototype.initialize.call(this,a);this.W=this.kn(this.O,this.Ba);this.Xe();return this.J},qe:function(a,b){a&&(this.od.length=0,b||(this.Hb=n),this.O=a,this.W=this.kn(a,this.Ba),this.Xe(),this.draw(),this.dispatchEvent(new L("onlineupdate")))},up:function(a,b){isNaN(a)||(this.od.length=0,b||(this.Hb=n),this.Ba=Math.abs(a),this.W=this.kn(this.O,this.Ba),this.Xe(),this.draw(),this.dispatchEvent(new L("onlineupdate")))},Tg:function(a){return this.w.Tg? this.w.Tg(a):Pb.Ut[this.zi(a)]},Fn:function(a){var b,a=a.currentTarget,c=this.Hb;b=c[0].Wa;c=c[c.length-1].Wa;0==a.index?(b=a.aa(),a=c):a=a.aa();this.up(P.Ns(b,a),i);this.qe(b,i)},$q:function(a){var a=a.currentTarget,b=a.index;this.Hb[0]={Wa:this.O,Sc:0};1==b&&(this.Hb[1]={Wa:a.O,Sc:0});this.Jg();this.Xh()},Dy:function(){if(!this.Hb){var a=[];a.push({Wa:this.O,Sc:0});a.push({Wa:this.W[Math.floor(3*this.W.length/4)],Sc:0});this.Hb=a}return this.Hb}});W(bd,{setCenter:bd.qe,setRadius:bd.up});var Pd={Nl:function(a){Pd["_"+a.L]||(Pd["_"+a.L]={});if(Pd.yH())return Pd.NG(a);if(Pd.zH())return Pd.VG(a);if(Pd.wH())return Pd.iG(a)},NG:function(a){Pd["_"+a.L].Rw||(Pd["_"+a.L].Rw=new B.XA(a));return Pd["_"+a.L].Rw},VG:function(a){Pd["_"+a.L].Yw||(Pd["_"+a.L].Yw=new B.ZA(a));return Pd["_"+a.L].Yw},iG:function(a){Pd["_"+a.L].uv||(Pd["_"+a.L].uv=new B.EA(a));return Pd["_"+a.L].uv},zH:function(){if(gb(Pd.mA))return Pd.mA;var a=lb();return Pd.mA=a},yH:function(){gb(Pd.lA)||(Pd.lA=mb());return Pd.lA}, wH:function(){gb(Pd.kA)||(Pd.kA=nb());return Pd.kA}};B.Nm=Pd; ');
