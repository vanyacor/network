(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{302:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__2l_8M"}},303:function(e,a,s){e.exports={message:"Message_message__6-JII",left:"Message_left__3tf73",right:"Message_right__2fOey"}},304:function(e,a,s){e.exports={wrapper:"Messages_wrapper__3xcgg",messages:"Messages_messages__3pDTk",input:"Messages_input__lcKbv",messagesArea:"Messages_messagesArea__-6Tw3",messageBtn:"Messages_messageBtn__Ff0dR"}},305:function(e,a,s){e.exports={dialogs_items_wrapper:"Persons_dialogs_items_wrapper__3dYkN",dialogs_items:"Persons_dialogs_items__j4gVH"}},306:function(e,a,s){e.exports={dialog:"DialogItem_dialog__kGLm4",active:"DialogItem_active___gswV"}},309:function(e,a,s){"use strict";s.r(a);var t=s(0),n=s.n(t),r=s(302),i=s.n(r),c=s(4),m=s(303),g=s.n(m),l=function(e){return n.a.createElement("div",{className:"".concat(g.a.wrapper)},n.a.createElement("div",{className:"".concat("me"==e.user?g.a.right:g.a.left)},n.a.createElement("div",{className:g.a.message},e.message)))},o=s(304),_=s.n(o),u=function(e){var a=e.messages.map((function(e){return n.a.createElement(l,{user:e.user,key:e.id,message:e.message})})),s=function(){e.addMessage()};return n.a.createElement("div",{className:_.a.wrapper},n.a.createElement("div",{className:_.a.messages},a),n.a.createElement("div",{className:_.a.input},n.a.createElement("textarea",{onKeyDown:function(e){"Enter"===e.key&&s()},onChange:function(a){var s=a.currentTarget.value;e.updateNewMessageText(s)},className:_.a.messagesArea,value:e.newMessageText,placeholder:"Enter new message"}),n.a.createElement("button",{onClick:s,className:_.a.messageBtn},n.a.createElement("span",null,"\u203a"))))},d=s(15),p=s(128),f=Object(d.b)((function(e){return{newMessageText:e.messagesPage.newMessageText,messages:e.messagesPage.messagesData}}),Object(c.a)({},p.a))(u),v=s(305),E=s.n(v),w=s(306),N=s.n(w),M=s(21),b=function(e){var a="/dialogs/"+e.id;return n.a.createElement(M.b,{className:N.a.dialog,activeClassName:N.a.active,to:a},e.name)},k=function(e){var a=e.dialogs.map((function(e){return n.a.createElement(b,{key:e.id,name:e.name,id:e.id})}));return n.a.createElement("div",{className:E.a.dialogs_items_wrapper},n.a.createElement("div",{className:E.a.dialogs_items},a))},x=Object(d.b)((function(e){return{dialogs:e.messagesPage.dialogs}}),(function(e){return{}}))(k);a.default=function(e){return n.a.createElement("div",{className:i.a.dialogs},n.a.createElement(x,null),n.a.createElement(f,null))}}}]);
//# sourceMappingURL=3.a44e04ba.chunk.js.map