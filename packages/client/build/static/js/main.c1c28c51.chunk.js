(this["webpackJsonp@np-bingo/client"]=this["webpackJsonp@np-bingo/client"]||[]).push([[0],{167:function(e,a,t){},197:function(e,a,t){},198:function(e,a,t){},204:function(e,a,t){},210:function(e,a,t){},211:function(e,a,t){},212:function(e,a,t){},213:function(e,a,t){},214:function(e,a,t){},215:function(e,a,t){},216:function(e,a,t){},217:function(e,a,t){},218:function(e,a,t){},219:function(e,a,t){},220:function(e,a,t){},221:function(e,a,t){},222:function(e,a,t){},244:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),o=t(12),r=t.n(o),s=(t(167),t(18)),i=t(4),l=t(13),d=t(130),j=Object(d.io)(Object({NODE_ENV:"production",PUBLIC_URL:"/np-bingo",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SERVER||"http://localhost:8082/",{withCredentials:!0}),b=t(144),u=t(304),m=(t(197),[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],[31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],[46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],[61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]]),O=["b","i","n","g","o"],h="INIT GAME",p="READY CHECK",f="STANDBY",g="START GAME",x="VALIDATE",v="PAUSE",y="FAILURE",k="WIN GAME",C="END GAME",w="SET ROOM",N="JOIN ROOM",E="PLAYER JOINED",R="PLAYER LEFT",S="PLAYER KICKED",T="PLAYER READY",A="PLAYER UNREADY",P="NEW CARD",D="UPDATE CROSSMARKS",L="INIT CROSSMARKS",B="WINNER CROSSMARKS",I="GET CARD",_="CHECK CARD SUCCESS",F="CHECK CARD FAILURE",G="NEW BALL",M="SET BALL",W="UPDATE GAMEMODE",U="LOOP START",H="LOOP STOP",K=t(91),z=t.n(K);function Y(e){return Math.floor(Math.random()*e.length)}function J(e){e.response?(console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers)):e.request?console.log(e.request):console.log("Error",e.message),console.log(e.config)}function q(e){var a,t=[],n=e,c=function(){var e=Y(n),c=n[e];t[a]=c,4!==a&&(n=n.filter((function(e){return e!==c})))};for(a=0;a<5;a++)c();return t}function V(e){return e.splice(12,1),function(e){return z.a.compressToBase64(e)}(e.join(""))}function Z(e,a){var t={row:!1,column:!1,diagonal:!1},n=function(e,a){var t,n=!1;for(t=0;t<5&&!(n=2===t?Q(e,a,t,!0):Q(e,a,t));t++);return n||!1}(e,a),c=function(e,a){var t,n=!1;for(t=0;t<5&&!(n=2===t?X(e,a,t,!0):X(e,a,t));t++);return n||!1}(e,a),o=function(e,a){var t,n=!1;for(t=0;t<2&&(0===t&&(n=$(e,a,!0)),1===t&&(n=ee(e,a,!0)),!n);t++);return n||!1}(e,a);return n&&(t=Object(i.a)(Object(i.a)({},t),{},{row:n})),c&&(t=Object(i.a)(Object(i.a)({},t),{},{column:c})),o&&(t=Object(i.a)(Object(i.a)({},t),{},{diagonal:o})),t}function Q(e,a,t,n){t||(t=0);var c,o=[];for(c=0;c<5;c++)if(n&&2===c)o.push(5*t+c);else{if(!ae([e[5*t+c]],a[c])){o=[];break}o.push(5*t+c)}return 0===o.length&&(o=!1),o}function X(e,a,t,n){t||(t=0);var c,o=[];for(c=0;c<5;c++)if(n&&2===c)o.push(5*c+t);else{if(!ae([e[5*c+t]],a[t])){o=[];break}o.push(5*c+t)}return 0===o.length&&(o=!1),o}function $(e,a,t){var n,c=[];for(n=0;n<5;n++)if(t&&2===n)c.push(6*n);else{if(!ae([e[6*n]],a[n])){c=[];break}c.push(6*n)}return 0===c.length&&(c=!1),c}function ee(e,a,t){var n,c=[],o=[4,3,2,1,0];for(n=0;n<5;n++)if(t&&2===n)c.push(5*o[n]+n);else{if(!ae([e[5*o[n]+n]],a[n])){c=[];break}c.push(5*o[n]+n)}return 0===c.length&&(c=!1),c}function ae(e,a){return a.some((function(a){return e.includes(a)}))}var te=t(14),ne=(t(198),t(284)),ce=t(280),oe=t(1);function re(e){var a=e.number,t=void 0===a?0:a,n=e.column,c=void 0===n?"":n,o=e.remainder,r=void 0===o?75:o,s=e.loop,i=void 0!==s&&s,l=e.progress,d=void 0===l?0:l,j=e.disabled,b=void 0!==j&&j;return Object(oe.jsxs)("div",{className:"ball-container",children:[Object(oe.jsx)(ce.a,{color:"primary",className:"badge monospace",badgeContent:b?0:r,overlap:"circle",children:Object(oe.jsxs)("div",{className:["ball","shadow",c,b&&"disabled"].join(" "),children:[Object(oe.jsx)("div",{className:"column monospace",children:c}),Object(oe.jsx)("div",{className:"number monospace",children:0!==t&&t})]})}),i&&Object(oe.jsx)(ne.a,{className:"progress",size:102,variant:"determinate",value:d})]})}var se={gamestate:"init",room:"",host:{_id:"",uid:0,name:"",socket:""},ball:{key:0,number:0,column:"",remainder:75},players:[],pool:m,draws:[[],[],[],[],[]],playerCard:{card:new Array(25),owner:{_id:"",uid:0,name:"",socket:""}},winner:{methods:[],data:{},player:{_id:"",uid:0,name:"",socket:""},card:new Array(25)},kicked:!1,rules:{mode:"default",special:[]},loop:!1};function ie(e,a){switch(a.type){case h:return Object(i.a)(Object(i.a)({},se),{},{draws:[[],[],[],[],[]]});case p:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"ready",ball:Object(i.a)({},se.ball),pool:Object(s.a)(se.pool),draws:[[],[],[],[],[]],playerCard:Object(i.a)({},se.playerCard),winner:Object(i.a)({},se.winner)});case f:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"standby"});case g:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"start"});case x:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"validate"});case v:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"pause"});case y:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"failure"});case k:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"win"});case C:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"end"});case w:case N:return Object(i.a)(Object(i.a)({},e),{},{room:a.payload.room,host:Object(i.a)({},a.payload.host)});case E:return Object(i.a)(Object(i.a)({},e),{},{players:[].concat(Object(s.a)(e.players),[a.payload])});case R:var t=e.players.filter((function(e){return e.socket!==a.payload.socket}));return Object(i.a)(Object(i.a)({},e),{},{players:Object(s.a)(t)});case S:return Object(i.a)(Object(i.a)({},e),{},{kicked:!0});case T:var n=e.players.map((function(e){return e.socket===a.payload.socket?Object(i.a)(Object(i.a)({},e),{},{ready:!0}):e}));return Object(i.a)(Object(i.a)({},e),{},{players:Object(s.a)(n)});case A:var c=e.players.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{ready:!1})}));return Object(i.a)(Object(i.a)({},e),{},{players:Object(s.a)(c)});case I:return Object(i.a)(Object(i.a)({},e),{},{playerCard:Object(i.a)(Object(i.a)({},e.playerCard),{},{card:Object(s.a)(a.payload.card),owner:Object(i.a)({},a.payload.owner)})});case _:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"win",winner:Object(i.a)({},a.payload)});case F:return Object(i.a)(Object(i.a)({},e),{},{gamestate:"failure",winner:Object(i.a)({},se.winner),playerCard:Object(i.a)({},se.playerCard)});case G:return Object(i.a)(Object(i.a)({},e),{},{ball:Object(i.a)({},a.payload.ball),draws:Object(s.a)(a.payload.draws),pool:Object(s.a)(a.payload.pool)});case M:return Object(i.a)(Object(i.a)({},e),{},{ball:Object(i.a)({},a.payload)});case"UPDATE POOL":return Object(i.a)(Object(i.a)({},e),{},{ball:Object(i.a)(Object(i.a)({},e.ball),{},{remainder:a.payload})});case W:return Object(i.a)(Object(i.a)({},e),{},{rules:Object(i.a)(Object(i.a)({},e.rules),{},{mode:a.payload})});case U:return Object(i.a)(Object(i.a)({},e),{},{loop:!0});case H:return Object(i.a)(Object(i.a)({},e),{},{loop:!1});default:throw new Error("Invalid dispatch type.")}}var le={"dark-mode":!1,"solo-mode":!0,"share-room":!0,"public-rooms":!1,"game-modes":!1,"special-rules":!1,"streamer-mode":!1,"max-room-size":30,"max-active-games":5,"ball-delay":3500},de=c.a.createContext({gamestate:se.gamestate,room:se.room,host:Object(i.a)({},se.host),mode:se.rules.mode}),je=c.a.createContext({ball:Object(i.a)({},se.ball),loop:se.loop,progress:0}),be=c.a.createContext(Object(i.a)({},le)),ue=t(47);function me(e){var a;switch(e){case"init":a="Waiting on host to start the game...";break;case"ready":a="Draw a card and click ready.";break;case"standby":a="Waiting for host to dispense a ball...";break;case"start":a="Click a square on the card to cross it out";break;case"validate":a="Sending card to host...";break;case"pause":a="A card is being checked for BINGO!";break;case"failure":a="Jumping the gun. No Bingo...";break;case"end":a="Game Over!";break;case"win":a="BINGO!";break;default:throw new Error("Invalid Gamestate in Player Status")}return a}function Oe(e,a){var t;switch(e){case"init":t=" ";break;case"ready":t="Waiting for player(s) to join...",a&&(1===a&&(t="".concat(a," player has joined...")),a>1&&(t="".concat(a," players have joined...")));break;case"standby":t="Click to dispense a ball.";break;case"start":t="Call out the ball, then dispense another";break;case"validate":t="Check card for a BINGO!";break;case"pause":t="Checking if card is a winner...";break;case"failure":t="This card is not a Bingo. Roll on!";break;case"end":t="Game Over!";break;case"win":t="BINGO!";break;default:throw new Error("Invalid Gamestate in Host Status")}return t}function he(e){var a=e.gamestate,t=void 0===a?"init":a,n=e.host,c=void 0!==n&&n,o=e.count,r=void 0===o?0:o;return Object(oe.jsx)(ue.a,{children:c?Oe(t,r):me(t)})}var pe=t(300),fe=t(247),ge=t(19),xe=t(294),ve=(t(204),t(136)),ye=t.n(ve),ke=t(246),Ce=t(310),we=t(61),Ne=t(311),Ee=t(6),Re=t(285),Se=t(135),Te=t.n(Se),Ae=Object(Ee.a)((function(e){return Object(Ne.a)({closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1)}})}))((function(e){var a=e.children,t=e.classes,n=e.onClose,c=Object(we.a)(e,["children","classes","onClose"]);return Object(oe.jsxs)(Re.a,Object(i.a)(Object(i.a)({disableTypography:!0},c),{},{children:[Object(oe.jsx)(ue.a,{variant:"h6",children:a}),Object(oe.jsx)(ke.a,{"aria-label":"close",className:[t.closeButton,"close-button"].join(" "),onClick:n,children:Object(oe.jsx)(Te.a,{})})]}))})),Pe=t(287),De=t(288),Le=t(306),Be=t(293),Ie=t(36);function _e(e,a){var t=Object(n.useState)(e),c=Object(l.a)(t,2),o=c[0],r=c[1],s=Object(n.useState)(""),d=Object(l.a)(s,2),j=d[0],b=d[1];return[o,j,function(e){e.persist(),r((function(a){return Object(i.a)(Object(i.a)({},a),{},Object(Ie.a)({},e.target.name,e.target.value))}))},function(e){e&&e.preventDefault(),a&&a(o)},function(e,a,t){var n=e.clipboardData.getData("text");try{if(t&&n.length>t)throw new Error("Clipboard paste is too long");var c,o,s=n.split(""),l={};for(c=0;c<s.length;c++)o=Object(Ie.a)({},"".concat(a).concat(c+1),s[c]),l=Object(i.a)(Object(i.a)({},l),o);r((function(e){return Object(i.a)(Object(i.a)({},e),l)}))}catch(d){!function(e){b(e.message)}(d)}}]}function Fe(e,a){var t=Object(n.useState)(e),c=Object(l.a)(t,2),o=c[0],r=c[1];return[o,function(){r(!0)},function(){r(!1),a&&a()}]}var Ge=function(e){var a=e.room,t=void 0===a?"":a,o=Fe(!1,(function(){m("Click to copy link to clipboard")})),r=Object(l.a)(o,3),s=r[0],i=r[1],d=r[2],j=Object(n.useState)("Click to copy link to clipboard"),b=Object(l.a)(j,2),u=b[0],m=b[1],O=Object(n.useRef)(null);return Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)(ke.a,{className:"share-button",onClick:i,"aria-label":"share",children:Object(oe.jsx)(ye.a,{})}),Object(oe.jsxs)(Ce.a,{open:s,onClose:d,"aria-labelledby":"share-dialog-title",fullWidth:!0,maxWidth:"xs",children:[Object(oe.jsx)(Ae,{id:"share-dialog-title",onClose:d,children:"Share Game"}),Object(oe.jsxs)(Pe.a,{children:[Object(oe.jsx)(De.a,{children:u}),Object(oe.jsx)(Le.a,{inputRef:O,value:"".concat(window.location.protocol,"//").concat(window.location.host,"/join?r=").concat(t),id:"code",fullWidth:!0})]}),Object(oe.jsx)(Be.a,{children:Object(oe.jsx)(fe.a,{className:"copy-button",onClick:function(e){if(O.current){O.current.select();try{document.execCommand("copy"),m("Link copied to clipboard!")}catch(a){throw new Error("Error in copy code to clipboard")}}},color:"primary",autoFocus:!0,children:"Copy"})})]})]})};function Me(e){var a=e.room,t=void 0===a?"    ":a,n=function(){return Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)("span",{className:"code-item empty",children:"_"}),Object(oe.jsx)("span",{className:"code-item empty",children:"_"}),Object(oe.jsx)("span",{className:"code-item empty",children:"_"}),Object(oe.jsx)("span",{className:"code-item empty",children:"_"})]})};return Object(oe.jsxs)("div",{id:"Code",children:[Object(oe.jsx)("div",{className:"code-label",children:"Room Code:"}),Object(oe.jsxs)("div",{className:"code-row",children:[Object(oe.jsx)("div",{className:"code-left"}),Object(oe.jsx)("div",{className:"code",children:Object(oe.jsx)("code",{children:""!==t?function(e){return Object.assign([],e).map((function(a,t){return Object(oe.jsx)("span",{className:"code-item ".concat(""===e&&"empty"),children:a},t)}))}(t):Object(oe.jsx)(n,{})})}),Object(oe.jsx)(be.Consumer,{children:function(e){return Object(oe.jsx)("div",{className:"code-right align-left",children:e["share-room"]&&""!==t&&Object(oe.jsx)(Ge,{room:t})})}})]})]})}t(210);var We=function(e){var a=e.home,t=void 0!==a&&a,n=e.room,o=void 0===n?"":n,r=e.mode,s=void 0===r?"default":r,i=e.onClick;return Object(oe.jsx)("footer",{children:t?Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)(ue.a,{align:"center",children:"Made by Tadjh Brooks"}),Object(oe.jsx)(xe.a,{href:"https://github.com/TadjhBrooks/np-bingo/",color:"primary",children:"https://github.com/TadjhBrooks/np-bingo"})]}):Object(oe.jsxs)(c.a.Fragment,{children:["solo"!==s&&Object(oe.jsx)(Me,{room:o}),Object(oe.jsx)(xe.a,{onClick:i,component:ge.b,to:"/",children:"Leave Room"})]})})};t(211);function Ue(e){var a,t,n=e.draws,c=void 0===n?[[],[],[],[],[]]:n,o=e.disabled,r=[],s=[Object(oe.jsx)("li",{},"ball1"),Object(oe.jsx)("li",{},"ball2"),Object(oe.jsx)("li",{},"ball3"),Object(oe.jsx)("li",{},"ball4"),Object(oe.jsx)("li",{},"ball5"),Object(oe.jsx)("li",{},"ball6"),Object(oe.jsx)("li",{},"ball7"),Object(oe.jsx)("li",{},"ball8"),Object(oe.jsx)("li",{},"ball9"),Object(oe.jsx)("li",{},"ball10"),Object(oe.jsx)("li",{},"ball11"),Object(oe.jsx)("li",{},"ball12"),Object(oe.jsx)("li",{},"ball13"),Object(oe.jsx)("li",{},"ball14"),Object(oe.jsx)("li",{},"ball15")];for(t=0;t<c.length;t++){a=O[t];var i=[].concat(s),l=void 0;for(l=0;l<c[t].length;l++)i[l]=Object(oe.jsx)("li",{children:"".concat(a).concat(c[t][l])},"ball".concat(l+1));r[t]=Object(oe.jsx)("ul",{className:["draws-column","draws-column-".concat(t+1),"monospace"].join(" "),children:i},"column".concat(t+1))}return Object(oe.jsx)("div",{className:["draws","shadow",o&&"disabled"].join(" "),children:r})}t(212);var He=t(291),Ke=t(295),ze=t(296),Ye=t(312),Je=t(297),qe=t(298),Ve=t(138),Ze=t.n(Ve),Qe=t(137),Xe=t.n(Qe),$e=t(139),ea=t.n($e);function aa(e){var a=e.data,t=void 0===a?[]:a,n=e.action;return Object(oe.jsx)("div",{className:"player-list",children:0!==t.length?Object(oe.jsx)(He.a,{children:t.map((function(e,a){return Object(oe.jsxs)(Ke.a,{children:[Object(oe.jsx)(ze.a,{children:Object(oe.jsx)(Ye.a,{children:e.ready?Object(oe.jsx)(Xe.a,{}):Object(oe.jsx)(Ze.a,{})})}),Object(oe.jsx)(Je.a,{primary:e.name,secondary:e.ready?"Ready":"Selecting a card..."}),Object(oe.jsx)(qe.a,{children:Object(oe.jsx)(ke.a,{className:"delete-button",onClick:n&&function(){return n(e)},edge:"end","aria-label":"status",children:Object(oe.jsx)(ea.a,{})})})]},"player".concat(a+1))}))}):Object(oe.jsx)(ue.a,{align:"center",children:"No players found"})})}var ta=t(299),na=t(140),ca=t.n(na),oa=(t(213),Object(ta.a)((function(e){return Object(Ne.a)({width:{width:e.spacing(18)}})})));var ra=function(e){var a=e.draws,t=void 0===a?[[],[],[],[],[]]:a,n=e.players,o=void 0===n?[]:n,r=e.checkCard,s=e.newBall,i=e.leaveRoom,l=e.gameToggle,d=e.removePlayer,j=e.start,b=oa(),u=function(e){switch(e){case"ready":return"Start Game";case"end":return"New Game";default:return"End Game"}};return Object(oe.jsx)(de.Consumer,{children:function(e){return Object(oe.jsxs)("div",{className:"Host",children:[Object(oe.jsxs)("header",{children:[Object(oe.jsx)("div",{className:"app-buttons",children:Object(oe.jsxs)(pe.a,{variant:"contained",color:"primary","aria-label":"contained primary button group",size:"large",children:[Object(oe.jsx)(fe.a,{className:b.width,onClick:function(){return l&&l(e.gamestate,e.room)},children:u(e.gamestate)}),Object(oe.jsx)(fe.a,{className:"".concat(b.width," ").concat("validate"!==e.gamestate&&"disabled"),disabled:"validate"!==e.gamestate&&!0,onClick:r,children:"Check Card"})]})}),Object(oe.jsx)(he,{host:!0,gamestate:e.gamestate,count:o.length})]}),Object(oe.jsx)("div",{className:"main",role:"main",children:"ready"===e.gamestate?Object(oe.jsx)(aa,{data:o,action:d}):Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)(je.Consumer,{children:function(a){return Object(oe.jsxs)("div",{className:"ball-wrapper",children:[Object(oe.jsx)(ke.a,{color:"primary",disabled:"start"!==e.gamestate&&"standby"!==e.gamestate&&"failure"!==e.gamestate&&!0,className:"".concat("start"!==e.gamestate&&"standby"!==e.gamestate&&"failure"!==e.gamestate&&"disabled"),onClick:function(){return a=e.gamestate,t=e.room,"standby"!==a&&"failure"!==a||j&&j(t),void(s&&s());var a,t},children:Object(oe.jsx)(ca.a,{fontSize:"large"})}),Object(oe.jsx)(re,{number:a.ball.number,column:a.ball.column,remainder:a.ball.remainder,disabled:"start"!==e.gamestate&&"standby"!==e.gamestate&&"failure"!==e.gamestate&&!0})]})}}),Object(oe.jsx)(Ue,{draws:t,disabled:"end"===e.gamestate&&!0})]})}),Object(oe.jsx)(We,{room:e.room,onClick:function(){return i&&i(e.room)}})]})}})};t(214),t(215);function sa(e){var a=e.index,t=void 0===a?1:a,c=e.children,o=e.checked,r=e.onClick,s=e.className,d=e.disabled,j=Object(we.a)(e,["index","children","checked","onClick","className","disabled"]),b=Object(n.useState)(!1),u=Object(l.a)(b,2),m=u[0],O=u[1];return Object(oe.jsx)("div",Object(i.a)(Object(i.a)({className:["grid-item","grid-item-".concat(t),(o||m)&&"checked",s&&s,"monospace"].join(" "),onClick:function(e){d||(O((function(e){return!e})),r(e))}},j),{},{children:c}))}t(216);function ia(e){var a=e.home,t=void 0!==a&&a,n=e.winner;return Object(oe.jsx)("div",{className:["logo",t&&"home"].join(" "),children:O.map((function(e,a){return Object(oe.jsx)("div",{className:["logo-item","logo-item-".concat(a+1),n&&"winner"].join(" "),children:Object(oe.jsx)("div",{className:"".concat(t&&"shadow"),children:e})},a)}))})}t(217);var la={card:new Array(25),serial:"",crossmarks:{}};function da(e,a){switch(a.type){case h:return Object(i.a)({},la);case P:return Object(i.a)(Object(i.a)({},e),{},{card:a.payload.card,serial:a.payload.serial});case L:return Object(i.a)(Object(i.a)({},e),{},{crossmarks:a.payload});case D:return Object(i.a)(Object(i.a)({},e),{},{crossmarks:Object(i.a)(Object(i.a)({},e.crossmarks),a.payload)});case B:return Object(i.a)(Object(i.a)({},e),{},{crossmarks:Object(i.a)({},a.payload)});default:throw new Error("Invalid Player dispatch type.")}}function ja(e){var a=e.card,t=void 0===a?Object(s.a)(la.card):a,n=e.serial,c=void 0===n?"":n,o=e.crossmarks,r=void 0===o?Object(i.a)({},la.crossmarks):o,l=e.winner,d=void 0!==l&&l,j=Object(we.a)(e,["card","serial","crossmarks","winner"]);return Object(oe.jsx)("div",{className:"grid-container",children:Object(oe.jsxs)("div",{className:["grid","shadow",d&&"winner"].join(" "),children:[Object(oe.jsx)("div",{className:"grid-header",children:Object(oe.jsx)(ia,{winner:d})}),t.map((function(e,a){var t="cell".concat(a+1);return Object(oe.jsx)(sa,Object(i.a)(Object(i.a)({id:t,className:[d&&"winner"].join(""),index:a+1,checked:r[t]},j),{},{disabled:d,children:12!==a?e:"free"}),t)})),Object(oe.jsx)("div",{className:"serial",children:c})]})})}function ba(e){var a=e.gamestate,t=void 0===a?"init":a,o=e.winner,r=void 0===o?Object(i.a)({},se.winner):o,d=e.kicked,j=void 0!==d&&d,b=e.sendCard,u=e.leaveRoom,O=e.standby,p=e.init,f=Object(n.useReducer)(da,la),g=Object(l.a)(f,2),x=g[0],v=g[1],y=Object(n.useCallback)((function(){var e=function(e){var a,t=[];for(a=0;a<5;a++){var n=q(e[a]),c=void 0;for(c=0;c<5;c++)t[5*c+a]=n[c]}return t}(m),a=V(Object(s.a)(e));v({type:P,payload:{card:e,serial:a}}),k()}),[]);Object(n.useEffect)((function(){"init"===t&&v({type:h}),"ready"===t&&y()}),[t,y]);var k=function(){v({type:L,payload:{}})};Object(n.useEffect)((function(){r.methods.length>0&&function(e,a){var t,n={};for(t=0;t<e.length;t++){var c=a[e[t]].map((function(e){var a="cell".concat(e+1);return Object(Ie.a)({},a,!0)}));n=Object.assign.apply(Object,[n].concat(Object(s.a)(c)))}v({type:B,payload:n})}(r.methods,r.data)}),[r]);var C=x.card,w=x.serial,N=x.crossmarks,E=Object(s.a)(C);return Object(oe.jsxs)("div",{className:"Play",children:[Object(oe.jsx)("header",{children:Object(oe.jsx)(de.Consumer,{children:function(e){return Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)("div",{className:"app-buttons",children:Object(oe.jsxs)(pe.a,{variant:"contained",color:"primary","aria-label":"contained primary button group",size:"large",children:[Object(oe.jsx)(fe.a,{className:"".concat("start"!==e.gamestate&&"disabled"),disabled:"start"!==e.gamestate&&!0,onClick:function(){return function(e,a,t,n){b&&("solo"!==e?b(e,a,t,n):b(e,a))}(e.mode,C,e.room,e.host)},children:"Bingo"}),Object(oe.jsx)(fe.a,{className:"".concat("ready"!==e.gamestate&&"disabled"),disabled:"ready"!==e.gamestate&&!0,onClick:y,children:"New Card"}),Object(oe.jsx)(fe.a,{className:"ready ".concat("ready"!==e.gamestate&&"failure"!==e.gamestate&&"disabled"),disabled:"ready"!==e.gamestate&&"failure"!==e.gamestate&&!0,onClick:function(){return O&&O(e.mode)},children:"failure"===e.gamestate?"Resume":"Ready"})]})}),Object(oe.jsx)(he,{gamestate:e.gamestate})]})}})}),Object(oe.jsxs)("div",{className:"main",role:"main",children:[Object(oe.jsx)(de.Consumer,{children:function(e){return Object(oe.jsx)(c.a.Fragment,{children:Object(oe.jsx)(je.Consumer,{children:function(a){return Object(oe.jsx)("div",{className:"ball-wrapper",children:Object(oe.jsx)(re,{number:a.ball.number,column:a.ball.column,remainder:a.ball.remainder,loop:a.loop,progress:a.progress,disabled:"start"!==e.gamestate&&"failure"!==e.gamestate&&!0})})}})})}}),Object(oe.jsx)(ja,{card:E,serial:w,winner:r.methods.length>0&&!0,crossmarks:N,onClick:function(e){var a=e.target,t=x.crossmarks[a.id],n=Object(Ie.a)({},a.id,!t);v({type:D,payload:n})}})]}),Object(oe.jsx)(de.Consumer,{children:function(e){return Object(oe.jsx)(We,{onClick:function(){return u&&u(e.room,e.host)},room:e.room,mode:e.mode})}}),Object(oe.jsxs)(Ce.a,{open:j,onClose:p,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[Object(oe.jsx)(Re.a,{id:"alert-dialog-title",children:"Leaving Room"}),Object(oe.jsx)(Pe.a,{children:Object(oe.jsx)(De.a,{id:"alert-dialog-description",children:"You have been kicked from the room."})}),Object(oe.jsx)(Be.a,{children:Object(oe.jsx)(xe.a,{component:ge.b,onClick:p,color:"primary",to:"/",children:"Leave Room"})})]})]})}t(218);var ua=t(71),ma=(t(219),{code1:"",code2:"",code3:"",code4:""});function Oa(e){var a=e.open,t=void 0!==a&&a,n=e.handleClose,c=e.onSumbit,o=_e(ma,(function(e){var a=Object.values(e).join("").toUpperCase();c&&c(a)})),r=Object(l.a)(o,5),s=r[0],i=r[1],d=r[2],j=r[3],b=r[4];var u=function(e){(d(e),e.target.value.length<e.target.maxLength)&&(e.target.previousSibling&&e.target.previousSibling.focus());e.target.value.length===e.target.maxLength&&(e.target.nextSibling&&e.target.nextSibling.focus())};return Object(oe.jsxs)(Ce.a,{open:t,onClose:n,"aria-labelledby":"join-dialog-title",fullWidth:!0,maxWidth:"xs",children:[Object(oe.jsx)(Ae,{id:"join-dialog-title",onClose:n,children:"Enter Room Code"}),Object(oe.jsxs)("form",{onSubmit:j,autoComplete:"off",children:[Object(oe.jsxs)(Pe.a,{children:[Object(oe.jsx)(De.a,{children:i&&i}),Object(oe.jsxs)("fieldset",{className:"code-input",children:[Object(oe.jsx)("input",{name:"code1",type:"text",pattern:ua.roomChar,maxLength:1,className:"partitioned",autoCapitalize:"on",autoFocus:!0,value:s.code1,onPaste:function(e){return b(e,"code",4)},onChange:u,required:!0}),Object(oe.jsx)("input",{name:"code2",type:"text",pattern:ua.roomChar,maxLength:1,className:"partitioned",autoCapitalize:"on",value:s.code2,onChange:u,required:!0}),Object(oe.jsx)("input",{name:"code3",type:"text",pattern:ua.roomChar,maxLength:1,className:"partitioned",autoCapitalize:"on",value:s.code3,onChange:u,required:!0}),Object(oe.jsx)("input",{name:"code4",type:"text",pattern:ua.roomChar,maxLength:1,className:"partitioned",autoCapitalize:"on",value:s.code4,onChange:u,required:!0})]})]}),Object(oe.jsx)(Be.a,{children:Object(oe.jsx)(fe.a,{variant:"contained",color:"primary",type:"submit",children:"Join"})})]})]})}function ha(e){var a=e.createRoom,t=e.joinRoom,n=Object(te.f)(),o=Fe(!1),r=Object(l.a)(o,3),s=r[0],i=r[1],d=r[2];return Object(oe.jsxs)(c.a.Fragment,{children:[Object(oe.jsx)("div",{className:"background"}),Object(oe.jsxs)("div",{className:"Home",children:[Object(oe.jsx)("header",{children:Object(oe.jsx)(ia,{home:!0})}),Object(oe.jsxs)("div",{className:"main",role:"main",children:[Object(oe.jsx)(be.Consumer,{children:function(e){return Object(oe.jsx)(fe.a,{className:"play-button",variant:"contained",color:"primary",component:e["solo-mode"]||e["public-rooms"]?ge.b:"button",to:e["solo-mode"]||e["public-rooms"]?"/join":void 0,onClick:e["solo-mode"]||e["public-rooms"]?void 0:i,size:"large",children:"Play"})}}),Object(oe.jsx)(fe.a,{color:"primary",onClick:a,size:"large",children:"Host"})]}),Object(oe.jsx)(We,{home:!0}),Object(oe.jsx)(Oa,{open:s,handleClose:d,onSumbit:function(e){t&&t(e),n.push("/play?r=".concat(e))}})]})]})}var pa=t(141),fa=t.n(pa);t(220);function ga(e){var a=e.data,t=void 0===a?[]:a,n=e.action;return Object(oe.jsx)("div",{className:"room-list",children:0!==t.length?Object(oe.jsx)(He.a,{children:t.map((function(e){return Object(oe.jsxs)(Ke.a,{children:[Object(oe.jsx)(ze.a,{children:Object(oe.jsx)(Ye.a,{children:e.players.length})}),Object(oe.jsx)(Je.a,{primary:e.room,secondary:e.host.name}),Object(oe.jsx)(qe.a,{children:Object(oe.jsx)(ke.a,{edge:"end","aria-label":"play",component:ge.b,to:"/play/".concat(e.room),onClick:n&&function(){return n(e.room)},children:Object(oe.jsx)(fa.a,{})})})]},e.room)}))}):Object(oe.jsx)(ue.a,{children:"No rooms found"})})}t(221);function xa(e){var a=e.queryRoom,t=void 0===a?null:a,c=e.joinRoom,o=e.solo,r=Object(te.f)(),s=Fe(!1),i=Object(l.a)(s,3),d=i[0],j=i[1],b=i[2],u=Object(n.useCallback)((function(e){c&&c(e),r.push("/play?r=".concat(e))}),[r,c]);Object(n.useEffect)((function(){null!==t&&u(t)}),[t,u]);var m=function(){o&&o("init"),r.push("/play?m=solo")},O=[{_id:"dadkjashdjshadka",room:"NYPD",host:{id:1100,name:"Siz Fulker"},players:[1111,1122,1133,1144,1155,1121,1112,1114]},{_id:"dadkjashdjshadka",room:"TEST",host:{id:1100,name:"Dean Watson"},players:[1111,1122,1133,1144,1155]},{_id:"dadkjashdjshadka",room:"ABCD",host:{id:1100,name:"Manny McDaniels"},players:[1111]}];return Object(oe.jsxs)("div",{className:"Join",children:[Object(oe.jsx)("header",{children:Object(oe.jsx)(ue.a,{variant:"h4",children:"Join"})}),Object(oe.jsx)(be.Consumer,{children:function(e){return Object(oe.jsxs)("div",{className:"main",role:"main",children:[e["public-rooms"]&&Object(oe.jsx)(ga,{data:O,action:c}),Object(oe.jsx)(fe.a,{className:"join-button",variant:"contained",color:"primary",onClick:j,size:"large",children:"Join Room"}),e["solo-mode"]&&Object(oe.jsx)(fe.a,{className:"solo-button",color:"primary",onClick:m,size:"large",children:"Solo"})]})}}),Object(oe.jsx)("footer",{children:Object(oe.jsx)(xe.a,{className:"nav-button",component:ge.b,to:"/",children:"\u2190 Back"})}),Object(oe.jsx)(Oa,{open:d,handleClose:b,onSumbit:u})]})}t(222);var va=t(289),ya=t(301),ka=t(308),Ca=t(302),wa=t(290),Na=t(248),Ea=t(309),Ra=t(292),Sa=t(303);function Ta(e){var a=e.title;!function(e){Object(n.useEffect)((function(){document.title=e?"".concat(e," Bingo - np-bingo"):"Bingo - np-bingo"}))}(a&&a);var t=Object(n.useState)("default"),o=Object(l.a)(t,2),r=o[0],s=o[1],d=Object(n.useState)({postage:!1,corners:!1,rovingl:!1,visible:!1}),j=Object(l.a)(d,2),b=j[0],u=j[1],m=function(e){u(Object(i.a)(Object(i.a)({},b),{},Object(Ie.a)({},e.target.name,e.target.checked)))},O=b.postage,h=b.corners,p=b.rovingl,f=b.visible;return Object(oe.jsxs)("div",{className:"Create",children:[Object(oe.jsx)("header",{children:Object(oe.jsx)(ue.a,{variant:"h4",component:"h1",children:"Create"})}),Object(oe.jsxs)("div",{className:"main",role:"main",children:[Object(oe.jsxs)(va.a,{component:"fieldset",children:[Object(oe.jsx)(wa.a,{component:"legend",children:"Game Type"}),Object(oe.jsxs)(ya.a,{"aria-label":"gametype",name:"gametype1",value:r,onChange:function(e){s(e.target.value)},children:[Object(oe.jsx)(Ca.a,{value:"default",control:Object(oe.jsx)(ka.a,{}),label:"Bingo"}),Object(oe.jsx)(Ca.a,{value:"housey",disabled:!0,control:Object(oe.jsx)(ka.a,{}),label:"Housey-Housey"}),Object(oe.jsx)(Ca.a,{value:"death",disabled:!0,control:Object(oe.jsx)(ka.a,{}),label:"Death Bingo"}),Object(oe.jsx)(Ca.a,{value:"blackout",disabled:!0,control:Object(oe.jsx)(ka.a,{}),label:"Blackout Bingo"})]})]}),("default"===r||"housey"===r)&&Object(oe.jsx)(c.a.Fragment,{children:Object(oe.jsxs)(va.a,{component:"fieldset",children:[Object(oe.jsx)(wa.a,{component:"legend",children:"Special Rules"}),Object(oe.jsxs)(Na.a,{children:[Object(oe.jsx)(Ca.a,{control:Object(oe.jsx)(Ea.a,{checked:O,onChange:m,name:"postage"}),label:"Postage Stamp"}),Object(oe.jsx)(Ca.a,{control:Object(oe.jsx)(Ea.a,{checked:h,onChange:m,name:"corners"}),label:"Corners"}),Object(oe.jsx)(Ca.a,{control:Object(oe.jsx)(Ea.a,{checked:p,onChange:m,name:"rovingl"}),label:"Roving L"})]}),Object(oe.jsx)(Ra.a,{children:"Optional"})]})}),Object(oe.jsxs)(va.a,{component:"fieldset",children:[Object(oe.jsx)(wa.a,{component:"legend",children:"Visibility"}),Object(oe.jsx)(Na.a,{children:Object(oe.jsx)(Ca.a,{control:Object(oe.jsx)(Sa.a,{checked:f,onChange:m,name:"visible"}),label:"Public"})})]}),Object(oe.jsx)(fe.a,{color:"primary",variant:"contained",children:"Create Room"})]}),Object(oe.jsx)("footer",{children:Object(oe.jsx)(xe.a,{className:"nav-button",component:ge.b,to:"/",children:"\u2190 Back"})})]})}var Aa=t(40),Pa=t.n(Aa),Da=t(72),La=t(142),Ba=t.n(La).a.create({baseURL:Object({NODE_ENV:"production",PUBLIC_URL:"/np-bingo",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}).SERVER||"http://localhost:8082/"});function Ia(){return(Ia=Object(Da.a)(Pa.a.mark((function e(a,t){return Pa.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ba.post("/api/game",a).then((function(e){t(e)})).catch((function(e){console.log("Error in Create Room"),J(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _a(){return(_a=Object(Da.a)(Pa.a.mark((function e(a,t,n){return Pa.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Ba.put("/api/game/join/".concat(a),t).then((function(e){n(e)})).catch((function(e){console.log("Error in Join Room"),J(e)}));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Fa(){return(Fa=Object(Da.a)(Pa.a.mark((function e(a,t){return Pa.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ba.put("/api/game/".concat(a),t).then((function(){console.log("Saving room")})).catch((function(e){console.log("Error in Save Room"),J(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ga(){return(Ga=Object(Da.a)(Pa.a.mark((function e(a){return Pa.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ba.delete("/api/game/".concat(a)).then((function(){console.log("Leaving room")})).catch((function(e){console.log("Error in Close Room"),J(e)}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}t(241);var Ma=t(305),Wa=Object(b.a)({palette:{type:le["dark-mode"]?"dark":"light"}});function Ua(){var e=Object(te.f)(),a=new URLSearchParams(Object(te.g)().search),t=Object(n.useReducer)(ie,se),c=Object(l.a)(t,2),o=c[0],r=c[1],d=Object(n.useState)({name:"Player",socket:""}),b=Object(l.a)(d,2),m=b[0],P=b[1],D=Object(n.useState)(0),L=Object(l.a)(D,2),B=L[0],K=L[1],z=Object(n.useCallback)((function(e){switch(e){case"init":r({type:h});break;case"ready":r({type:p});break;case"standby":r({type:f});break;case"start":r({type:g});break;case"validate":r({type:x});break;case"pause":r({type:v});break;case"failure":r({type:y});break;case"win":r({type:k});break;case"end":r({type:C});break;default:throw new Error("Invalid game state.")}}),[]);Object(n.useEffect)((function(){j.on("connect",(function(){console.log("User connected"),P((function(e){return Object(i.a)(Object(i.a)({},e),{},{socket:j.id})}))})),j.on("disconnect",(function(){console.log("User disconnected")})),j.on("player-joined",(function(e){console.log("".concat(e.name," joined")),r({type:E,payload:e})})),j.on("player-left",(function(e){console.log("".concat(e.name," left")),r({type:R,payload:e})})),j.on("player-remove",(function(){console.log("You have been removed from the room"),r({type:S,payload:!0})})),j.on("player-ready",(function(e){console.log("".concat(e.name," ready")),r({type:T,payload:e})})),j.on("game-ready",(function(){console.log("Pick a card"),z("ready")})),j.on("game-standby",(function(){console.log("Game starting shortly..."),z("standby")})),j.on("game-start",(function(){console.log("Game started"),z("start")})),j.on("game-ball",(function(e){console.log("Ball: ".concat(e.column.toUpperCase()).concat(e.number)),r({type:M,payload:e})})),j.on("receive-card",(function(e,a,t){console.log("".concat(a.name," sent a card to you.")),z("validate"),j.emit("checking-card",e),r({type:I,payload:{card:t,owner:a}})})),j.on("game-validation",(function(){console.log("A card has been sent to the host. Checking if it's a winner!"),z("pause")})),j.on("winner",(function(e,a){console.log("You won the game!"),j.emit("win",e,a.player.name),r({type:_,payload:a})})),j.on("game-win",(function(e){console.log("".concat(e," won the game!"))})),j.on("game-continue",(function(){console.log("Not a winner..."),z("start")})),j.on("game-end",(function(){console.log("Game over!"),z("end")}))}),[z]);var J=function(e){z("ready"),function(e,a,t){_a.apply(this,arguments)}(e,m,(function(a){j.emit("join-room",e,a.data.host.socket,m),r({type:N,payload:{room:e,host:a.data.host}})}))},q=function(e,a){z("init"),a?j.emit("leave-room",e,a.socket,m):(j.emit("leave-room",e),function(e){Ga.apply(this,arguments)}(e))},V=Object(n.useCallback)((function(e,a,t,n,c){var o=Object(s.a)(a),i=Object(s.a)(t),l=function(e){var a=function(e){var a,t=0,n=[];for(a=0;a<e.length;a++)e[a].length>0&&(t+=e[a].length,n.push(a));return{remainder:t,columns:n}}(e),t=a.columns,n=a.remainder;if(t.length>0){var c=Y(t),o=e[t[c]],r=Y(o);return{key:t[c],number:o[r],column:O[t[c]],remainder:n-1}}return{key:0,number:0,column:"",remainder:0}}(a);0!==l.number&&(o=function(e,a){return e.map((function(e,t){return t===a.key?e.filter((function(e){return e!==a.number})):e}))}(a,l),i[l.key].push(l.number)),r({type:G,payload:{ball:l,draws:i,pool:o}}),"solo"!==e&&n&&j.emit("ball",n,l),0===l.remainder&&(z("end"),"solo"!==e&&n&&j.emit("end",n)),c&&c(l)}),[z]);Object(n.useEffect)((function(){if(o.loop&&"start"===o.gamestate){var e=setInterval((function(){K((function(e){return e>=100?100:e+9.17}))}),le["ball-delay"]/12);return function(){return clearInterval(e)}}}),[o.gamestate,o.loop,B]),Object(n.useEffect)((function(){if(o.loop&&0!==o.ball.remainder){var e=setTimeout((function(){V("solo",o.pool,o.draws,void 0,(function(e){K(0),console.log("Ball: ".concat(e.column.toUpperCase()).concat(e.number)),0===e.remainder&&(r({type:H}),console.log("Game over"))}))}),le["ball-delay"]);return function(){return clearTimeout(e)}}}),[V,o.ball.remainder,o.loop,o.draws,o.pool]);var Q=function(e,a,t,n){var c=Z(a.card,t),o=Object.keys(c).filter((function(e){return c[e]}));if(o.length>0){var s={methods:o,data:c,player:a.owner,card:a.card};r({type:_,payload:s}),"solo"!==e&&n&&(j.emit("winning-card",n,s),function(e,a){Fa.apply(this,arguments)}(n,s))}else r({type:F}),"solo"!==e&&n&&j.emit("losing-card",n)},X=Object(n.useCallback)((function(e){switch(e){case"init":!function(e){switch(e){case"default":r({type:W,payload:"default"});break;case"solo":r({type:W,payload:"solo"});break;case"death":r({type:W,payload:"death"});break;case"blackout":r({type:W,payload:"blackout"});break;default:throw new Error("Invalid game mode.")}}("solo"),z("ready");break;case"standby":z("start"),r({type:U});break;case"validate":z("validate"),r({type:H});break;case"pause":z("pause"),Q(o.rules.mode,o.playerCard,o.draws);break;default:throw new Error("Invalid game state in solo.")}}),[z,o.draws,o.playerCard,o.rules.mode]);Object(n.useEffect)((function(){if(!o.loop&&"validate"===o.gamestate){var e=setTimeout((function(){X("pause"),K(0)}),1e3);return function(){return clearTimeout(e)}}}),[X,o.loop,o.gamestate]);var $=o.gamestate,ee=o.ball,ae=o.draws,ne=o.pool,ce=o.playerCard,re=o.winner,be=o.room,ue=o.players,me=o.kicked,Oe=o.host,he=o.rules,pe=o.loop,fe={gamestate:$,room:be,host:Oe,mode:he.mode},ge={ball:ee,loop:pe,progress:B};return Object(oe.jsx)(de.Provider,{value:fe,children:Object(oe.jsx)(je.Provider,{value:ge,children:Object(oe.jsx)(u.a,{theme:Wa,children:Object(oe.jsx)(Ma.a,{className:"App shadow",fixed:!0,maxWidth:"xs",children:Object(oe.jsxs)(te.c,{children:[Object(oe.jsx)(te.a,{path:"/create",children:Object(oe.jsx)(Ta,{})}),Object(oe.jsx)(te.a,{path:"/host",children:Object(oe.jsx)(ra,{checkCard:function(){return Q(he.mode,ce,ae,be)},newBall:function(){return V(he.mode,ne,ae,be)},draws:ae,leaveRoom:q,players:ue,gameToggle:function(e,a){switch(e){case"ready":z("standby"),j.emit("standby",a);break;case"end":z("ready"),j.emit("ready",a);break;default:r({type:A}),z("end"),j.emit("end",a)}},removePlayer:function(e){j.emit("remove-player",e),r({type:R,payload:e})},start:function(e){z("start"),j.emit("start",e)}})}),Object(oe.jsx)(te.a,{path:"/join",children:Object(oe.jsx)(xa,{joinRoom:J,queryRoom:a.get("r"),solo:X})}),Object(oe.jsx)(te.a,{path:"/play",children:Object(oe.jsx)(ba,{gamestate:$,init:function(){return z("init")},standby:function(e){z("standby"),"solo"!==e?j.emit("ready-up",o.host.socket,m):X("standby")},leaveRoom:q,kicked:me,sendCard:function(e,a,t,n){"solo"!==e?(z("validate"),t&&n&&j.emit("send-card",t,n.socket,m,a)):(r({type:I,payload:{card:a,owner:m}}),X("validate"))},winner:re})}),Object(oe.jsx)(te.a,{exact:!0,path:"/",children:Object(oe.jsx)(ha,{joinRoom:J,createRoom:function(){z("ready"),function(e,a){Ia.apply(this,arguments)}(m,(function(a){r({type:w,payload:{room:a.data.game.room,host:a.data.game.host}}),j.emit("create-room",a.data.game.room),e.push("/host?r=".concat(a.data.game.room))}))}})})]})})})})})}var Ha=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,314)).then((function(a){var t=a.getCLS,n=a.getFID,c=a.getFCP,o=a.getLCP,r=a.getTTFB;t(e),n(e),c(e),o(e),r(e)}))},Ka=t(143);t.n(Ka).a.config(),r.a.render(Object(oe.jsx)(c.a.StrictMode,{children:Object(oe.jsx)(ge.a,{basename:"/np-bingo",children:Object(oe.jsx)(be.Provider,{value:le,children:Object(oe.jsx)(Ua,{})})})}),document.getElementById("root")),Ha()},71:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.roomRegex=a.roomPattern=a.roomChar=a.makeID=void 0,a.makeID=function(e){var a,t="",n="ABCDEFGHJKLMNPQRSTUVWXYZ123456789";for(a=0;a<e;a++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},a.roomChar="[A-HJ-NP-Z1-9]",a.roomPattern=a.roomChar+"{4}",a.roomRegex=new RegExp(a.roomPattern)}},[[244,1,2]]]);
//# sourceMappingURL=main.c1c28c51.chunk.js.map