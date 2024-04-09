import{Plugin as t}from"@ckeditor/ckeditor5-core";import{Typing as e}from"@ckeditor/ckeditor5-typing";import{FormHeaderView as a,createDropdown as r,addListToDropdown as i,Model as c,View as l,addKeyboardHandlingForGrid as n,ButtonView as s,FocusCycler as h}from"@ckeditor/ckeditor5-ui";import{Collection as o,FocusTracker as d,KeystrokeHandler as u,global as w,CKEditorError as g}from"@ckeditor/ckeditor5-utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class p extends a{constructor(t,e){super(t);const a=t.t;this.set("class","ck-special-characters-navigation"),this.groupDropdownView=this._createGroupDropdown(e),this.groupDropdownView.panelPosition="rtl"===t.uiLanguageDirection?"se":"sw",this.label=a("Special characters"),this.children.add(this.groupDropdownView)}get currentGroupName(){return this.groupDropdownView.value}focus(){this.groupDropdownView.focus()}_createGroupDropdown(t){const e=this.locale,a=e.t,c=r(e),l=this._getCharacterGroupListItemDefinitions(c,t),n=a("Character categories");return c.set("value",l.first.model.name),c.buttonView.bind("label").to(c,"value",(e=>t.get(e))),c.buttonView.set({isOn:!1,withText:!0,tooltip:n,class:["ck-dropdown__button_label-width_auto"],ariaLabel:n,ariaLabelledBy:void 0}),c.on("execute",(t=>{c.value=t.source.name})),c.delegate("execute").to(this),i(c,l,{ariaLabel:n,role:"menu"}),c}_getCharacterGroupListItemDefinitions(t,e){const a=new o;for(const[r,i]of e){const e=new c({name:r,label:i,withText:!0,role:"menuitemradio"});e.bind("isOn").to(t,"value",(t=>t===e.name)),a.add({type:"button",model:e})}return a}}function m(t,{insertAt:e}={}){if(!t||"undefined"==typeof document)return;const a=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css",window.litNonce&&r.setAttribute("nonce",window.litNonce),"top"===e&&a.firstChild?a.insertBefore(r,a.firstChild):a.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}m(".ck.ck-character-grid{max-width:100%}.ck.ck-character-grid .ck-character-grid__tiles{display:grid}:root{--ck-character-grid-tile-size:24px}.ck.ck-character-grid{max-height:200px;overflow-x:hidden;overflow-y:auto;width:350px}@media screen and (max-width:600px){.ck.ck-character-grid{width:190px}}.ck.ck-character-grid .ck-character-grid__tiles{grid-gap:var(--ck-spacing-standard);grid-template-columns:repeat(10,1fr);margin:var(--ck-spacing-standard) var(--ck-spacing-large)}@media screen and (max-width:600px){.ck.ck-character-grid .ck-character-grid__tiles{grid-template-columns:repeat(5,1fr)}}.ck.ck-character-grid .ck-character-grid__tile{border:0;font-size:1.2em;height:var(--ck-character-grid-tile-size);min-height:var(--ck-character-grid-tile-size);min-width:var(--ck-character-grid-tile-size);padding:0;transition:box-shadow .2s ease;width:var(--ck-character-grid-tile-size)}.ck.ck-character-grid .ck-character-grid__tile:focus:not(.ck-disabled),.ck.ck-character-grid .ck-character-grid__tile:hover:not(.ck-disabled){border:0;box-shadow:inset 0 0 0 1px var(--ck-color-base-background),0 0 0 2px var(--ck-color-focus-border)}.ck.ck-character-grid .ck-character-grid__tile .ck-button__label{line-height:var(--ck-character-grid-tile-size);text-align:center;width:100%}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class k extends l{constructor(t){super(t),this.tiles=this.createCollection(),this.setTemplate({tag:"div",children:[{tag:"div",attributes:{class:["ck","ck-character-grid__tiles"]},children:this.tiles}],attributes:{class:["ck","ck-character-grid"]}}),this.focusTracker=new d,this.keystrokes=new u,n({keystrokeHandler:this.keystrokes,focusTracker:this.focusTracker,gridItems:this.tiles,numberOfColumns:()=>w.window.getComputedStyle(this.element.firstChild).getPropertyValue("grid-template-columns").split(" ").length,uiLanguageDirection:this.locale&&this.locale.uiLanguageDirection})}createTile(t,e){const a=new s(this.locale);return a.set({label:t,withText:!0,class:"ck-character-grid__tile"}),a.extendTemplate({attributes:{title:e},on:{mouseover:a.bindTemplate.to("mouseover"),focus:a.bindTemplate.to("focus")}}),a.on("mouseover",(()=>{this.fire("tileHover",{name:e,character:t})})),a.on("focus",(()=>{this.fire("tileFocus",{name:e,character:t})})),a.on("execute",(()=>{this.fire("execute",{name:e,character:t})})),a}render(){super.render();for(const t of this.tiles)this.focusTracker.add(t.element);this.tiles.on("change",((t,{added:e,removed:a})=>{if(e.length>0)for(const t of e)this.focusTracker.add(t.element);if(a.length>0)for(const t of a)this.focusTracker.remove(t.element)})),this.keystrokes.listenTo(this.element)}destroy(){super.destroy(),this.keystrokes.destroy()}focus(){this.tiles.first.focus()}}m(".ck.ck-character-info{border-top:1px solid var(--ck-color-base-border);display:flex;justify-content:space-between;padding:var(--ck-spacing-small) var(--ck-spacing-large)}.ck.ck-character-info>*{font-size:var(--ck-font-size-small);text-transform:uppercase}.ck.ck-character-info .ck-character-info__name{max-width:280px;overflow:hidden;text-overflow:ellipsis}.ck.ck-character-info .ck-character-info__code{opacity:.6}@media screen and (max-width:600px){.ck.ck-character-info{max-width:190px}}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class L extends l{constructor(t){super(t);const e=this.bindTemplate;this.set("character",null),this.set("name",null),this.bind("code").to(this,"character",f),this.setTemplate({tag:"div",children:[{tag:"span",attributes:{class:["ck-character-info__name"]},children:[{text:e.to("name",(t=>t||"​"))}]},{tag:"span",attributes:{class:["ck-character-info__code"]},children:[{text:e.to("code")}]}],attributes:{class:["ck","ck-character-info"]}})}}function f(t){if(null===t)return"";return"U+"+("0000"+t.codePointAt(0).toString(16)).slice(-4)}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class b extends l{constructor(t,e,a,r){super(t),this.navigationView=e,this.gridView=a,this.infoView=r,this.items=this.createCollection(),this.focusTracker=new d,this.keystrokes=new u,this._focusCycler=new h({focusables:this.items,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.setTemplate({tag:"div",children:[this.navigationView,this.gridView,this.infoView],attributes:{tabindex:"-1"}}),this.items.add(this.navigationView.groupDropdownView.buttonView),this.items.add(this.gridView)}render(){super.render(),this.focusTracker.add(this.navigationView.groupDropdownView.buttonView.element),this.focusTracker.add(this.gridView.element),this.keystrokes.listenTo(this.element)}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}focus(){this.navigationView.focus()}}m(".ck.ck-special-characters-navigation>.ck-label{max-width:160px;overflow:hidden;text-overflow:ellipsis}.ck.ck-special-characters-navigation>.ck-dropdown .ck-dropdown__panel{max-height:250px;overflow-x:hidden;overflow-y:auto}@media screen and (max-width:600px){.ck.ck-special-characters-navigation{max-width:190px}.ck.ck-special-characters-navigation>.ck-form__header__label{overflow:hidden;text-overflow:ellipsis}}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
const v="All";class x extends t{static get requires(){return[e]}static get pluginName(){return"SpecialCharacters"}constructor(t){super(t);const e=t.t;this._characters=new Map,this._groups=new Map,this._allSpecialCharactersGroupLabel=e("All")}init(){const t=this.editor,e=t.t,a=t.commands.get("insertText");t.ui.componentFactory.add("specialCharacters",(i=>{const c=r(i);let l;return c.buttonView.set({label:e("Special characters"),icon:'<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2.5a7.47 7.47 0 0 1 4.231 1.31 7.268 7.268 0 0 1 2.703 3.454 7.128 7.128 0 0 1 .199 4.353c-.39 1.436-1.475 2.72-2.633 3.677h2.013c0-.226.092-.443.254-.603a.876.876 0 0 1 1.229 0c.163.16.254.377.254.603v.853c0 .209-.078.41-.22.567a.873.873 0 0 1-.547.28l-.101.006h-4.695a.517.517 0 0 1-.516-.518v-1.265c0-.21.128-.398.317-.489a5.601 5.601 0 0 0 2.492-2.371 5.459 5.459 0 0 0 .552-3.693 5.53 5.53 0 0 0-1.955-3.2A5.71 5.71 0 0 0 10 4.206 5.708 5.708 0 0 0 6.419 5.46 5.527 5.527 0 0 0 4.46 8.663a5.457 5.457 0 0 0 .554 3.695 5.6 5.6 0 0 0 2.497 2.37.55.55 0 0 1 .317.49v1.264c0 .286-.23.518-.516.518H2.618a.877.877 0 0 1-.614-.25.845.845 0 0 1-.254-.603v-.853c0-.226.091-.443.254-.603a.876.876 0 0 1 1.228 0c.163.16.255.377.255.603h1.925c-1.158-.958-2.155-2.241-2.545-3.678a7.128 7.128 0 0 1 .199-4.352 7.268 7.268 0 0 1 2.703-3.455A7.475 7.475 0 0 1 10 2.5z"/></svg>',tooltip:!0}),c.bind("isEnabled").to(a),c.on("execute",((e,a)=>{t.execute("insertText",{text:a.character}),t.editing.view.focus()})),c.on("change:isOpen",(()=>{if(!l){l=this._createDropdownPanelContent(i,c);const t=new b(i,l.navigationView,l.gridView,l.infoView);c.panelView.children.add(t)}l.infoView.set({character:null,name:null})})),c}))}addItems(t,e,a={label:t}){if(t===v)throw new g("special-character-invalid-group-name",null);const r=this._getGroup(t,a.label);for(const t of e)r.items.add(t.title),this._characters.set(t.title,t.character)}getGroups(){const t=Array.from(this._groups.keys()),e=this.editor.config.get("specialCharacters.order")||[],a=e.find((e=>!t.includes(e)));if(a)throw new g("special-character-invalid-order-group-name",null,{invalidGroup:a});return new Set([...e,...t])}getCharactersForGroup(t){if(t===v)return new Set(this._characters.keys());const e=this._groups.get(t);return e?e.items:void 0}getCharacter(t){return this._characters.get(t)}_getGroup(t,e){return this._groups.has(t)||this._groups.set(t,{items:new Set,label:e}),this._groups.get(t)}_updateGrid(t,e){e.tiles.clear();const a=this.getCharactersForGroup(t);for(const t of a){const a=this.getCharacter(t);e.tiles.add(e.createTile(a,t))}}_createDropdownPanelContent(t,e){const a=Array.from(this.getGroups()).map((t=>[t,this._groups.get(t).label])),r=new Map([[v,this._allSpecialCharactersGroupLabel],...a]),i=new p(t,r),c=new k(t),l=new L(t);return c.delegate("execute").to(e),c.on("tileHover",((t,e)=>{l.set(e)})),c.on("tileFocus",((t,e)=>{l.set(e)})),i.on("execute",(()=>{this._updateGrid(i.currentGroupName,c)})),this._updateGrid(i.currentGroupName,c),{navigationView:i,gridView:c,infoView:l}}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class _ extends t{static get pluginName(){return"SpecialCharactersArrows"}init(){const t=this.editor,e=t.t;t.plugins.get("SpecialCharacters").addItems("Arrows",[{title:e("leftwards simple arrow"),character:"←"},{title:e("rightwards simple arrow"),character:"→"},{title:e("upwards simple arrow"),character:"↑"},{title:e("downwards simple arrow"),character:"↓"},{title:e("leftwards double arrow"),character:"⇐"},{title:e("rightwards double arrow"),character:"⇒"},{title:e("upwards double arrow"),character:"⇑"},{title:e("downwards double arrow"),character:"⇓"},{title:e("leftwards dashed arrow"),character:"⇠"},{title:e("rightwards dashed arrow"),character:"⇢"},{title:e("upwards dashed arrow"),character:"⇡"},{title:e("downwards dashed arrow"),character:"⇣"},{title:e("leftwards arrow to bar"),character:"⇤"},{title:e("rightwards arrow to bar"),character:"⇥"},{title:e("upwards arrow to bar"),character:"⤒"},{title:e("downwards arrow to bar"),character:"⤓"},{title:e("up down arrow with base"),character:"↨"},{title:e("back with leftwards arrow above"),character:"🔙"},{title:e("end with leftwards arrow above"),character:"🔚"},{title:e("on with exclamation mark with left right arrow above"),character:"🔛"},{title:e("soon with rightwards arrow above"),character:"🔜"},{title:e("top with upwards arrow above"),character:"🔝"}],{label:e("Arrows")})}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class y extends t{static get pluginName(){return"SpecialCharactersText"}init(){const t=this.editor,e=t.t;t.plugins.get("SpecialCharacters").addItems("Text",[{character:"‹",title:e("Single left-pointing angle quotation mark")},{character:"›",title:e("Single right-pointing angle quotation mark")},{character:"«",title:e("Left-pointing double angle quotation mark")},{character:"»",title:e("Right-pointing double angle quotation mark")},{character:"‘",title:e("Left single quotation mark")},{character:"’",title:e("Right single quotation mark")},{character:"“",title:e("Left double quotation mark")},{character:"”",title:e("Right double quotation mark")},{character:"‚",title:e("Single low-9 quotation mark")},{character:"„",title:e("Double low-9 quotation mark")},{character:"¡",title:e("Inverted exclamation mark")},{character:"¿",title:e("Inverted question mark")},{character:"‥",title:e("Two dot leader")},{character:"…",title:e("Horizontal ellipsis")},{character:"‡",title:e("Double dagger")},{character:"‰",title:e("Per mille sign")},{character:"‱",title:e("Per ten thousand sign")},{character:"‼",title:e("Double exclamation mark")},{character:"⁈",title:e("Question exclamation mark")},{character:"⁉",title:e("Exclamation question mark")},{character:"⁇",title:e("Double question mark")},{character:"©",title:e("Copyright sign")},{character:"®",title:e("Registered sign")},{character:"™",title:e("Trade mark sign")},{character:"§",title:e("Section sign")},{character:"¶",title:e("Paragraph sign")},{character:"⁋",title:e("Reversed paragraph sign")}],{label:e("Text")})}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class C extends t{static get pluginName(){return"SpecialCharactersMathematical"}init(){const t=this.editor,e=t.t;t.plugins.get("SpecialCharacters").addItems("Mathematical",[{character:"<",title:e("Less-than sign")},{character:">",title:e("Greater-than sign")},{character:"≤",title:e("Less-than or equal to")},{character:"≥",title:e("Greater-than or equal to")},{character:"–",title:e("En dash")},{character:"—",title:e("Em dash")},{character:"¯",title:e("Macron")},{character:"‾",title:e("Overline")},{character:"°",title:e("Degree sign")},{character:"−",title:e("Minus sign")},{character:"±",title:e("Plus-minus sign")},{character:"÷",title:e("Division sign")},{character:"⁄",title:e("Fraction slash")},{character:"×",title:e("Multiplication sign")},{character:"ƒ",title:e("Latin small letter f with hook")},{character:"∫",title:e("Integral")},{character:"∑",title:e("N-ary summation")},{character:"∞",title:e("Infinity")},{character:"√",title:e("Square root")},{character:"∼",title:e("Tilde operator")},{character:"≅",title:e("Approximately equal to")},{character:"≈",title:e("Almost equal to")},{character:"≠",title:e("Not equal to")},{character:"≡",title:e("Identical to")},{character:"∈",title:e("Element of")},{character:"∉",title:e("Not an element of")},{character:"∋",title:e("Contains as member")},{character:"∏",title:e("N-ary product")},{character:"∧",title:e("Logical and")},{character:"∨",title:e("Logical or")},{character:"¬",title:e("Not sign")},{character:"∩",title:e("Intersection")},{character:"∪",title:e("Union")},{character:"∂",title:e("Partial differential")},{character:"∀",title:e("For all")},{character:"∃",title:e("There exists")},{character:"∅",title:e("Empty set")},{character:"∇",title:e("Nabla")},{character:"∗",title:e("Asterisk operator")},{character:"∝",title:e("Proportional to")},{character:"∠",title:e("Angle")},{character:"¼",title:e("Vulgar fraction one quarter")},{character:"½",title:e("Vulgar fraction one half")},{character:"¾",title:e("Vulgar fraction three quarters")}],{label:e("Mathematical")})}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class T extends t{static get pluginName(){return"SpecialCharactersLatin"}init(){const t=this.editor,e=t.t;t.plugins.get("SpecialCharacters").addItems("Latin",[{character:"Ā",title:e("Latin capital letter a with macron")},{character:"ā",title:e("Latin small letter a with macron")},{character:"Ă",title:e("Latin capital letter a with breve")},{character:"ă",title:e("Latin small letter a with breve")},{character:"Ą",title:e("Latin capital letter a with ogonek")},{character:"ą",title:e("Latin small letter a with ogonek")},{character:"Ć",title:e("Latin capital letter c with acute")},{character:"ć",title:e("Latin small letter c with acute")},{character:"Ĉ",title:e("Latin capital letter c with circumflex")},{character:"ĉ",title:e("Latin small letter c with circumflex")},{character:"Ċ",title:e("Latin capital letter c with dot above")},{character:"ċ",title:e("Latin small letter c with dot above")},{character:"Č",title:e("Latin capital letter c with caron")},{character:"č",title:e("Latin small letter c with caron")},{character:"Ď",title:e("Latin capital letter d with caron")},{character:"ď",title:e("Latin small letter d with caron")},{character:"Đ",title:e("Latin capital letter d with stroke")},{character:"đ",title:e("Latin small letter d with stroke")},{character:"Ē",title:e("Latin capital letter e with macron")},{character:"ē",title:e("Latin small letter e with macron")},{character:"Ĕ",title:e("Latin capital letter e with breve")},{character:"ĕ",title:e("Latin small letter e with breve")},{character:"Ė",title:e("Latin capital letter e with dot above")},{character:"ė",title:e("Latin small letter e with dot above")},{character:"Ę",title:e("Latin capital letter e with ogonek")},{character:"ę",title:e("Latin small letter e with ogonek")},{character:"Ě",title:e("Latin capital letter e with caron")},{character:"ě",title:e("Latin small letter e with caron")},{character:"Ĝ",title:e("Latin capital letter g with circumflex")},{character:"ĝ",title:e("Latin small letter g with circumflex")},{character:"Ğ",title:e("Latin capital letter g with breve")},{character:"ğ",title:e("Latin small letter g with breve")},{character:"Ġ",title:e("Latin capital letter g with dot above")},{character:"ġ",title:e("Latin small letter g with dot above")},{character:"Ģ",title:e("Latin capital letter g with cedilla")},{character:"ģ",title:e("Latin small letter g with cedilla")},{character:"Ĥ",title:e("Latin capital letter h with circumflex")},{character:"ĥ",title:e("Latin small letter h with circumflex")},{character:"Ħ",title:e("Latin capital letter h with stroke")},{character:"ħ",title:e("Latin small letter h with stroke")},{character:"Ĩ",title:e("Latin capital letter i with tilde")},{character:"ĩ",title:e("Latin small letter i with tilde")},{character:"Ī",title:e("Latin capital letter i with macron")},{character:"ī",title:e("Latin small letter i with macron")},{character:"Ĭ",title:e("Latin capital letter i with breve")},{character:"ĭ",title:e("Latin small letter i with breve")},{character:"Į",title:e("Latin capital letter i with ogonek")},{character:"į",title:e("Latin small letter i with ogonek")},{character:"İ",title:e("Latin capital letter i with dot above")},{character:"ı",title:e("Latin small letter dotless i")},{character:"Ĳ",title:e("Latin capital ligature ij")},{character:"ĳ",title:e("Latin small ligature ij")},{character:"Ĵ",title:e("Latin capital letter j with circumflex")},{character:"ĵ",title:e("Latin small letter j with circumflex")},{character:"Ķ",title:e("Latin capital letter k with cedilla")},{character:"ķ",title:e("Latin small letter k with cedilla")},{character:"ĸ",title:e("Latin small letter kra")},{character:"Ĺ",title:e("Latin capital letter l with acute")},{character:"ĺ",title:e("Latin small letter l with acute")},{character:"Ļ",title:e("Latin capital letter l with cedilla")},{character:"ļ",title:e("Latin small letter l with cedilla")},{character:"Ľ",title:e("Latin capital letter l with caron")},{character:"ľ",title:e("Latin small letter l with caron")},{character:"Ŀ",title:e("Latin capital letter l with middle dot")},{character:"ŀ",title:e("Latin small letter l with middle dot")},{character:"Ł",title:e("Latin capital letter l with stroke")},{character:"ł",title:e("Latin small letter l with stroke")},{character:"Ń",title:e("Latin capital letter n with acute")},{character:"ń",title:e("Latin small letter n with acute")},{character:"Ņ",title:e("Latin capital letter n with cedilla")},{character:"ņ",title:e("Latin small letter n with cedilla")},{character:"Ň",title:e("Latin capital letter n with caron")},{character:"ň",title:e("Latin small letter n with caron")},{character:"ŉ",title:e("Latin small letter n preceded by apostrophe")},{character:"Ŋ",title:e("Latin capital letter eng")},{character:"ŋ",title:e("Latin small letter eng")},{character:"Ō",title:e("Latin capital letter o with macron")},{character:"ō",title:e("Latin small letter o with macron")},{character:"Ŏ",title:e("Latin capital letter o with breve")},{character:"ŏ",title:e("Latin small letter o with breve")},{character:"Ő",title:e("Latin capital letter o with double acute")},{character:"ő",title:e("Latin small letter o with double acute")},{character:"Œ",title:e("Latin capital ligature oe")},{character:"œ",title:e("Latin small ligature oe")},{character:"Ŕ",title:e("Latin capital letter r with acute")},{character:"ŕ",title:e("Latin small letter r with acute")},{character:"Ŗ",title:e("Latin capital letter r with cedilla")},{character:"ŗ",title:e("Latin small letter r with cedilla")},{character:"Ř",title:e("Latin capital letter r with caron")},{character:"ř",title:e("Latin small letter r with caron")},{character:"Ś",title:e("Latin capital letter s with acute")},{character:"ś",title:e("Latin small letter s with acute")},{character:"Ŝ",title:e("Latin capital letter s with circumflex")},{character:"ŝ",title:e("Latin small letter s with circumflex")},{character:"Ş",title:e("Latin capital letter s with cedilla")},{character:"ş",title:e("Latin small letter s with cedilla")},{character:"Š",title:e("Latin capital letter s with caron")},{character:"š",title:e("Latin small letter s with caron")},{character:"Ţ",title:e("Latin capital letter t with cedilla")},{character:"ţ",title:e("Latin small letter t with cedilla")},{character:"Ť",title:e("Latin capital letter t with caron")},{character:"ť",title:e("Latin small letter t with caron")},{character:"Ŧ",title:e("Latin capital letter t with stroke")},{character:"ŧ",title:e("Latin small letter t with stroke")},{character:"Ũ",title:e("Latin capital letter u with tilde")},{character:"ũ",title:e("Latin small letter u with tilde")},{character:"Ū",title:e("Latin capital letter u with macron")},{character:"ū",title:e("Latin small letter u with macron")},{character:"Ŭ",title:e("Latin capital letter u with breve")},{character:"ŭ",title:e("Latin small letter u with breve")},{character:"Ů",title:e("Latin capital letter u with ring above")},{character:"ů",title:e("Latin small letter u with ring above")},{character:"Ű",title:e("Latin capital letter u with double acute")},{character:"ű",title:e("Latin small letter u with double acute")},{character:"Ų",title:e("Latin capital letter u with ogonek")},{character:"ų",title:e("Latin small letter u with ogonek")},{character:"Ŵ",title:e("Latin capital letter w with circumflex")},{character:"ŵ",title:e("Latin small letter w with circumflex")},{character:"Ŷ",title:e("Latin capital letter y with circumflex")},{character:"ŷ",title:e("Latin small letter y with circumflex")},{character:"Ÿ",title:e("Latin capital letter y with diaeresis")},{character:"Ź",title:e("Latin capital letter z with acute")},{character:"ź",title:e("Latin small letter z with acute")},{character:"Ż",title:e("Latin capital letter z with dot above")},{character:"ż",title:e("Latin small letter z with dot above")},{character:"Ž",title:e("Latin capital letter z with caron")},{character:"ž",title:e("Latin small letter z with caron")},{character:"ſ",title:e("Latin small letter long s")}],{label:e("Latin")})}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class V extends t{static get pluginName(){return"SpecialCharactersCurrency"}init(){const t=this.editor,e=t.t;t.plugins.get("SpecialCharacters").addItems("Currency",[{character:"$",title:e("Dollar sign")},{character:"€",title:e("Euro sign")},{character:"¥",title:e("Yen sign")},{character:"£",title:e("Pound sign")},{character:"¢",title:e("Cent sign")},{character:"₠",title:e("Euro-currency sign")},{character:"₡",title:e("Colon sign")},{character:"₢",title:e("Cruzeiro sign")},{character:"₣",title:e("French franc sign")},{character:"₤",title:e("Lira sign")},{character:"¤",title:e("Currency sign")},{character:"₿",title:e("Bitcoin sign")},{character:"₥",title:e("Mill sign")},{character:"₦",title:e("Naira sign")},{character:"₧",title:e("Peseta sign")},{character:"₨",title:e("Rupee sign")},{character:"₩",title:e("Won sign")},{character:"₪",title:e("New sheqel sign")},{character:"₫",title:e("Dong sign")},{character:"₭",title:e("Kip sign")},{character:"₮",title:e("Tugrik sign")},{character:"₯",title:e("Drachma sign")},{character:"₰",title:e("German penny sign")},{character:"₱",title:e("Peso sign")},{character:"₲",title:e("Guarani sign")},{character:"₳",title:e("Austral sign")},{character:"₴",title:e("Hryvnia sign")},{character:"₵",title:e("Cedi sign")},{character:"₶",title:e("Livre tournois sign")},{character:"₷",title:e("Spesmilo sign")},{character:"₸",title:e("Tenge sign")},{character:"₹",title:e("Indian rupee sign")},{character:"₺",title:e("Turkish lira sign")},{character:"₻",title:e("Nordic mark sign")},{character:"₼",title:e("Manat sign")},{character:"₽",title:e("Ruble sign")}],{label:e("Currency")})}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class S extends t{static get pluginName(){return"SpecialCharactersEssentials"}static get requires(){return[V,y,C,_,T]}}export{x as SpecialCharacters,_ as SpecialCharactersArrows,V as SpecialCharactersCurrency,S as SpecialCharactersEssentials,T as SpecialCharactersLatin,C as SpecialCharactersMathematical,y as SpecialCharactersText};