(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{43:function(e,n,t){},44:function(e,n,t){"use strict";t.r(n);var r=t(18),a=t.n(r),c=t(4),u=t(2),i=t(0),o=function(e){var n=e.persons,t=e.remove;return Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsxs)("div",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:function(){return t({person:e})},children:"Delete"})]},e.number)}))})},s=function(e){var n=e.filter,t=e.filterChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.add,t=e.handleNum,r=e.handleName,a=e.newName,c=e.newNum;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:a,onChange:r})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:c,onChange:t})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},l=t(3),f=t.n(l),j=t(5),h=t(6),b=t.n(h),m="/api/persons",p=function(){var e=Object(j.a)(f.a.mark((function e(){var n,t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get(m),e.next=3,n;case 3:return t=e.sent,e.abrupt("return",t.data);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(j.a)(f.a.mark((function e(n){var t,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.post(m,n),e.next=3,t;case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),O=function(){var e=Object(j.a)(f.a.mark((function e(n,t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=b.a.put("".concat(m,"/").concat(n),t),e.abrupt("return",r.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),x=function(){var e=Object(j.a)(f.a.mark((function e(n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b.a.delete("".concat(m,"/").concat(n));case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),w={getAll:p,create:v,update:O,deletePerson:x},g=(t(43),function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"notification",children:n})}),N=function(){var e=Object(u.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],a=Object(u.useState)(""),l=Object(c.a)(a,2),f=l[0],j=l[1],h=Object(u.useState)(""),b=Object(c.a)(h,2),m=b[0],p=b[1],v=Object(u.useState)(""),O=Object(c.a)(v,2),x=O[0],N=O[1],k=Object(u.useState)(null),y=Object(c.a)(k,2),C=y[0],S=y[1];Object(u.useEffect)((function(){w.getAll().then((function(e){r(e)}))}),[]);var A=0===x.length?t:t.filter((function(e){return e.name.includes(x)}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(g,{message:C}),Object(i.jsx)(s,{value:x,filterChange:function(e){N(e.target.value)}}),Object(i.jsx)("h3",{children:"Add a new"}),Object(i.jsx)(d,{newNum:m,newName:f,add:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f})),a={name:f,number:m};w.create(a).then((function(e){void 0!==n&&n.number!==m&&window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))&&(w.update(n.id,a).then((function(e){r(t.map((function(t){return t.id!==n.id?t:e})))})).catch((function(e){S("the note '".concat(n.name,"' was already deleted from server")),r(t.filter((function(e){return e.id!==n.id})))})),setTimeout((function(){S(null)}),5e3),S("".concat(n.name," number changed"))),r(t.concat(e)),S("".concat(e.name," added"))})).catch((function(e){S(e.response.data.error)})),j(""),p("")},handleName:function(e){j(e.target.value)},handleNum:function(e){p(e.target.value)}}),Object(i.jsx)("h3",{children:"Numbers"}),Object(i.jsx)(o,{persons:A,remove:function(e){var n=e.person;window.confirm("Delete ".concat(n.name," ?"))&&w.deletePerson(n.id).then(r(t.filter((function(e){return e.id!==n.id})))).catch((function(e){S("the note '".concat(n.name,"' was already deleted from server"),e)})),setTimeout((function(){S(null)}),5e3),S("".concat(n.name," deleted"))}})]})};a.a.render(Object(i.jsx)(N,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.9444ee61.chunk.js.map