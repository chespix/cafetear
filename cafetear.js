class SITE {
	constructor() {
		document.body.innerHTML = this.page(
			DATA.langs,
			DATA.name,
			DATA.sections
		);
		document.getElementById("langs").addEventListener(
			"change",
			this.select_lang.bind(this)
		);
		var lang = window.navigator.language.split('-')[0];
		if(DATA.langs[0][0] == lang || !DATA.langs.includes(lang)) {
			this.load(DATA.langs[0][0]);
		}
		else {
			document.getElementById("langs").value = lang
		}
	}

	load(lang) {
		this.load_lang("intro", DATA.intro, lang);
		for (let s = 0; s < DATA.sections.length; s++) {
			this.load_lang("n"+s, DATA.sections[s].name, lang);
			for (let i = 0; i < DATA.sections[s].items.length; i++) {
				this.load_lang("s"+s+"i"+i+"_history", DATA.sections[s].items[i].history, lang);
			}
		}
	}

	load_lang(id, source, lang) {
		var text = "N/A";
		if(source && source[lang]) {
			text = source[lang];
		}
		document.getElementById(id).textContent = text;
	}

	select_lang() {
		this.load(document.getElementById("langs").value);
	}

	show(section) {
		document.querySelectorAll(".section").forEach(a=>a.style.display = "none");
		document.querySelectorAll(".navbar").forEach(a=>a.style.backgroundColor = "rgb(7,7,7,0)");
		var elem = document.getElementById("s"+section);
		elem.style.display = "block";
		elem = document.getElementById("b"+section);
		elem.style.backgroundColor = "rgb(77,77,77,.5)";
	}

	page(langs, name, intro, sections) {
		return '<div id="header">\
<div id="toolbox">' + this.langs(langs) + '</div>\
<div id="name">' + name + '</div>\
<div id="intro">' + intro + '</div>\
<div id="navbar">'+ this.navbar(DATA.sections) +'</div>\
</div>'
+ this.sections(DATA.sections) +
'<div id="footer" class="noprint"></div>';
	}

	langs(langs) {
		var c = '<select id="langs">';
		for (let l = 0; l < langs[0].length; l++) {
			c += '<option value="'+ langs[0][l] +'">'+ langs[1][l] +'</option>';
		}
		c += '</select>'
		return c
	}

	navbar(sections) {
		var c = "";
		for (let s = 0; s < sections.length; s++) {
			c += '<button id="b' + s + '" class="navbar" onclick="_SITE.show('+s+')"><img class="icon" src="'+sections[s].icon+'"></img><span id="n' + s + '"></span></button>';
		}
		return c;
	}

	sections(sections) {
		var c = "";
		for (let s = 0; s < sections.length; s++) {
			c += this.section(s,sections[s].items);
		}
		return c;
	}

	section(s, items) {
		return '<div id="s' + s + '" class="section">' + this.section_items(s, items) + '</div>';
	}

	section_items(s, items) {
		var content = "";
		for (let i = 0; i < items.length; i++) {
			content += this.section_item(s, i,
				items[i].name,
				items[i].logo,
				items[i].star,
				items[i].url
			)
		}
		return content;
	}

	section_item(s, i, name, logo, star, url) {
		return '<div id="s' + s + 'i' + i + '" class="item">\
<img class="logo" src="'+logo+'"></img>\
<a id="s' + s + 'i' + i + '_name" class="item_name" target="_blank" href=' + url + '>' + name + '</a>\
<div id="s' + s + 'i' + i + '_star" class="item_star item_star_' + star + '"></div>\
<div id="s' + s + 'i' + i + '_history" class="item_history"></div>\
</div>';
	}
};

document.addEventListener("DOMContentLoaded", function() {
	_SITE = new SITE();
	_SITE.show(0);
});
