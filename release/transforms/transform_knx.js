/* transform_knx.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

define(["transform_default"],function(e){function t(t,n){var r=5;t="DPT:"+t;for(i=0;i<Math.pow(2,8*n);i++){var s=i.toString(16);s=(new Array(2*n-s.length+1)).join("0")+s;var o=e[t].encode(e[t].decode(s));if(s!=o){var u=e[t].decode(s),a=e[t].decode(e[t].encode(u));if(u!=a){console.log(i,s,o,e[t].decode(s),u,a,r);if(--r<0)return r}}}}e.addTransform("DPT",{1.001:{name:"DPT_Switch",encode:function(e){return(e|128).toString(16)},decode:function(e){return parseInt(e,16)}},1:{link:"1.001"},1.002:{link:"1.001"},1.003:{link:"1.001"},1.008:{link:"1.001"},1.009:{link:"1.001"},2:{link:"1.001"},3:{link:"1.001"},4.001:{name:"DPT_Char_ASCII",encode:function(e){var t=e.charCodeAt(0).toString(16);return(t.length==1?"800":"80")+t},decode:function(e){return String.fromCharCode(parseInt(e,16))}},4:{link:"4.001"},5.001:{name:"DPT_Scaling",unit:"%",range:{min:0,max:100},encode:function(e){var t=parseInt(e*255/100).toString(16);return(t.length==1?"800":"80")+t},decode:function(e){return parseInt(e,16)*100/255}},5.003:{name:"DPT_Angle",unit:"°",range:{min:0,max:360},encode:function(e){var t=parseInt(e*255/360).toString(16);return(t.length==1?"800":"80")+t},decode:function(e){return parseInt(e,16)*360/255}},5.004:{name:"DPT_Percent_U8",unit:"%",range:{min:0,max:255},encode:function(e){var t=parseInt(e).toString(16);return(t.length==1?"800":"80")+t},decode:function(e){return parseInt(e,16)}},"5.010":{link:"5.004",name:"DPT_Value_1_Ucount",unit:"-"},5:{link:"5.004",name:"8-Bit Unsigned Value"},6.001:{name:"DPT_Percent_V8",encode:function(e){var t=e<0?e+256:e;return t=t.toString(16),(t.length==1?"800":"80")+t},decode:function(e){var t=parseInt(e,16);return t>127?t-256:t}},6:{link:"6.001"},7.001:{name:"DPT_Value_2_Ucount",encode:function(e){var t=zeroFillString(parseInt(e).toString(16),4);return"80"+t},decode:function(e){return parseInt(e,16)}},7:{link:"7.001"},8.001:{name:"DPT_Value_2_Count",encode:function(e){var t=parseInt(e);return t=t<0?t+65536:t,"80"+zeroFillString(t.toString(16),4)},decode:function(e){var t=parseInt(e,16);return t>32767?t-65536:t}},8:{link:"8.001"},9.001:{name:"DPT_Value_Temp",encode:function(e){if(undefined===e||NaN==e)return"7fff";var t=e<0?32768:0,n=Math.round(e*100),r=0;while(Math.abs(n)>2047)n>>=1,r++;var i=(t|r<<11|n&2047).toString(16);return"80"+((new Array(4-i.length+1)).join("0")+i)},decode:function(e){if(32767==parseInt(e,16))return NaN;var t=parseInt(e.substr(0,2),16),n=parseInt(e.substr(2,2),16),r=parseInt(t&128),i=parseInt(t&120)>>3,s=parseInt((t&7)<<8|n);return r!=0&&(s=-(~(s-1)&2047)),(1<<i)*.01*s}},9.004:{link:"9.001"},9.007:{link:"9.001"},9.008:{link:"9.001"},"9.020":{link:"9.001"},9.021:{link:"9.001"},9:{link:"9.001"},10.001:{name:"DPT_TimeOfDay",encode:function(e){var t=zeroFillString(((e.getDay()<<5)+e.getHours()).toString(16),2);return t+=zeroFillString(e.getMinutes().toString(16),2),t+=zeroFillString(e.getSeconds().toString(16),2),"80"+t},decode:function(e){var t=new Date;t.setHours(parseInt(e.substr(0,2),16)&31),t.setMinutes(parseInt(e.substr(2,2),16)),t.setSeconds(parseInt(e.substr(4,2),16));var n=(parseInt(e.substr(0,2),16)&224)>>5;if(n>0){var r=(n-t.getDay())%7;t.setDate(t.getDate()+r)}return t}},11.001:{name:"DPT_Date",encode:function(e){},decode:function(e){var t=parseInt(e.substr(4,2),16)&127;return new Date(t<90?t+2e3:t+1900,(parseInt(e.substr(2,2),16)&15)-1,parseInt(e.substr(0,2),16)&31)}},12.001:{name:"DPT_Value_4_Ucount",encode:function(e){var t=zeroFillString(parseInt(e).toString(16),8);return"80"+t},decode:function(e){return parseInt(e,16)}},12:{link:"12.001"},13.001:{name:"DPT_Value_4_Count",encode:function(e){var t=parseInt(e);return t=t<0?t+4294967296:t,"80"+zeroFillString(t.toString(16),8)},decode:function(e){var t=parseInt(e,16);return t>2147483647?t-4294967296:t}},13:{link:"13.001"},14.001:{name:"DPT_Value_Acceleration_Angular",encode:function(e){},decode:function(e){var t=parseInt(e,16),n=t&2147483648?-1:1,r=((t&2139095040)>>23)-127,i=t&8388607|8388608;return n*Math.pow(2,r)*(i/(1<<23))}},14:{link:"14.001",name:"4 byte float",lname:{de:"4 Byte Gleitkommazahl"},unit:"-"},16.001:{name:"DPT_String_8859_1",lname:{de:"14 Byte Text ISO-8859-1"},encode:function(e){var t="80";for(var n=0;n<14;n++){var r=e.charCodeAt(n);t+=r?(r<16?"0":"")+r.toString(16):"00"}return t},decode:function(e){var t="",n;for(var r=0;r<28;r+=2)n=parseInt(e.substr(r,2),16),n>0&&(t+=String.fromCharCode(n));return t}},"16.000":{link:"16.001",name:"DPT_String_ASCII",lname:{de:"14 Byte Text ASCII"},unit:"-"},16:{link:"16.001",name:"DPT_String_ASCII",lname:{de:"14 Byte Text ASCII"},unit:"-"},20.102:{name:"DPT_HVACMode",lname:{de:"KONNEX Betriebsart"},unit:"-",range:{"enum":["auto","comfort","standby","economy","building_protection"]},encode:function(e){var t;switch(e){case 1:case"comfort":t=1;break;case 2:case"standby":t=2;break;case 3:case"economy":t=3;break;case 4:case"building_protection":t=4;break;default:t=0}return t=t.toString(16),(t.length==1?"800":"80")+t},decode:function(e){switch(parseInt(e,16)){case 1:return"comfort";case 2:return"standby";case 3:return"economy";case 4:return"building_protection";default:return"auto"}}},24.001:{name:"DPT_VarString_8859_1",lname:{de:"variable String ISO-8859-1"},encode:function(e){var t="80";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);t+=r?(r<16?"0":"")+r.toString(16):"00"}return t+="00",t},decode:function(e){var t="",n;for(var r=0;r<e.length;r+=2)n=parseInt(e.substr(r,2),16),n>0&&(t+=String.fromCharCode(n));return t}},"temp dummy":{link:"1.001"}})});