(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{291:function(e,a,s){e.exports={dialogs:"Dialogs_dialogs__3xwf0"}},292:function(e,a,s){e.exports={message:"Message_message__3jfec",left:"Message_left__t_hg1",right:"Message_right__25rkD"}},293:function(e,a,s){e.exports={wrapper:"Messages_wrapper__2Bfmn",messages:"Messages_messages__19I6g",input:"Messages_input__3pXCq",messagesArea:"Messages_messagesArea__3zh4k",messageBtn:"Messages_messageBtn__2M4Dc"}},294:function(e,a,s){e.exports={dialogs_items:"Persons_dialogs_items__3H7Xr"}},295:function(e,a,s){e.exports={dialog:"DialogItem_dialog__2XD0x",active:"DialogItem_active__1Eh_V"}},300:function(e,a,s){"use strict";s.r(a);var t=s(0),n=s.n(t),r=s(291),c=s.n(r),i=s(126),g=s(292),m=s.n(g),l=function(e){return n.a.createElement("div",{className:"".concat(m.a.wrapper)},n.a.createElement("div",{className:"".concat("me"==e.user?m.a.right:m.a.left)},n.a.createElement("div",{className:m.a.message},e.message)))},o=s(293),u=s.n(o),_=function(e){var a=e.messages.map((function(e){return n.a.createElement(l,{user:e.user,key:e.id,message:e.message})})),s=n.a.createRef(),t=function(){e.addMessage()};return n.a.createElement("div",{className:u.a.wrapper},n.a.createElement("div",{className:u.a.messages},a),n.a.createElement("div",{className:u.a.input},n.a.createElement("textarea",{onKeyDown:function(e){"Enter"===e.key&&t()},onChange:function(){var a=s.current.value;e.updateNewMessageText(a)},ref:s,className:u.a.messagesArea,value:e.newMessageText}),n.a.createElement("button",{onClick:t,className:u.a.messageBtn},n.a.createElement("span",null,"\u203a"))))},d=s(13),f=Object(d.b)((function(e){return{newMessageText:e.messagesPage.newMessageText,messages:e.messagesPage.messagesData}}),(function(e){return{addMessage:function(){e(Object(i.a)())},updateNewMessageText:function(a){e(Object(i.c)(a))}}}))(_),p=s(294),v=s.n(p),E=s(295),M=s.n(E),N=s(16),w=function(e){var a="/dialogs/"+e.id;return n.a.createElement(N.b,{className:M.a.dialog,activeClassName:M.a.active,to:a},e.name)},x=function(e){var a=e.dialogs.map((function(e){return n.a.createElement(w,{key:e.id,name:e.name,id:e.id})}));return n.a.createElement("div",{className:v.a.dialogs_items},a)},b=Object(d.b)((function(e){return{dialogs:e.messagesPage.dialogs}}),(function(e){return{}}))(x);a.default=function(e){return n.a.createElement("div",{className:c.a.dialogs},n.a.createElement(b,null),n.a.createElement(f,null))}}}]);
//# sourceMappingURL=3.b66b05c8.chunk.js.map