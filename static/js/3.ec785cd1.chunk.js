(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{308:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__2l_8M",input:"Dialogs_input__PFj4E",messagesArea:"Dialogs_messagesArea__2wUXv",messageBtn:"Dialogs_messageBtn__3M2Oh"}},309:function(e,a,s){e.exports={message:"Message_message__6-JII",left:"Message_left__3tf73",right:"Message_right__2fOey"}},310:function(e,a,s){e.exports={wrapper:"Messages_wrapper__3xcgg",messages:"Messages_messages__3pDTk"}},311:function(e,a,s){e.exports={dialogs_items_wrapper:"Persons_dialogs_items_wrapper__3dYkN",dialogs_items:"Persons_dialogs_items__j4gVH"}},312:function(e,a,s){e.exports={dialog:"DialogItem_dialog__kGLm4",active:"DialogItem_active___gswV"}},317:function(e,a,s){"use strict";s.r(a);var t=s(0),n=s.n(t),r=s(71),i=s(308),l=s.n(i),c=s(309),g=s.n(c),m=function(e){return n.a.createElement("div",{className:"".concat(g.a.wrapper)},n.a.createElement("div",{className:"".concat("me"==e.user?g.a.right:g.a.left)},n.a.createElement("div",{className:g.a.message},e.message)))},o=s(310),u=s.n(o),_=function(e){var a=e.messages.map((function(e){return n.a.createElement(m,{user:e.user,key:e.id,message:e.message})}));return n.a.createElement("div",{className:u.a.wrapper},n.a.createElement("div",{className:u.a.messages},a))},d=s(15),p=Object(d.b)((function(e){return{messages:e.messagesPage.messagesData}}),{})(_),f=s(311),v=s.n(f),E=s(312),w=s.n(E),N=s(22),M=function(e){var a="/dialogs/"+e.id;return n.a.createElement(N.b,{className:w.a.dialog,activeClassName:w.a.active,to:a},e.name)},x=function(e){var a=e.dialogs.map((function(e){return n.a.createElement(M,{key:e.id,name:e.name,id:e.id})}));return n.a.createElement("div",{className:v.a.dialogs_items_wrapper},n.a.createElement("div",{className:v.a.dialogs_items},a))},b=Object(d.b)((function(e){return{dialogs:e.messagesPage.dialogs}}),(function(e){return{}}))(x),k=s(133),h=Object(d.b)((function(e){return{newMessageText:e.messagesPage.newMessageText}}),{addMessage:k.a.addMessage,updateNewMessageText:k.a.updateNewMessageText})((function(e){var a=function(){e.addMessage()};return n.a.createElement("div",{className:l.a.input},n.a.createElement("textarea",{onKeyDown:function(e){"Enter"===e.key&&a()},onChange:function(a){var s=a.currentTarget.value;e.updateNewMessageText(s)},className:l.a.messagesArea,value:e.newMessageText,placeholder:"Enter new message"}),n.a.createElement("button",{onClick:a,className:l.a.messageBtn},n.a.createElement("span",null,"\u203a")))}));a.default=function(e){return n.a.createElement("div",{className:l.a.dialogs},n.a.createElement(b,null),n.a.createElement(p,null),n.a.createElement(r.a,null,n.a.createElement(h,null)))}}}]);
//# sourceMappingURL=3.ec785cd1.chunk.js.map