/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'lawn\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-comment': '&#xe920;',
		'icon-angle-down': '&#xe91b;',
		'icon-angle-up': '&#xe91c;',
		'icon-angle-right': '&#xe91d;',
		'icon-angle-left': '&#xe91e;',
		'icon-speech': '&#xe91f;',
		'icon-analytic-report': '&#xe901;',
		'icon-construction-worker': '&#xe902;',
		'icon-gardener': '&#xe903;',
		'icon-lawn-mowet': '&#xe904;',
		'icon-tree': '&#xe900;',
		'icon-analytic-report': '&#xe901;',
		'icon-construction-worker': '&#xe902;',
		'icon-gardener': '&#xe903;',
		'icon-lawn-mowet': '&#xe904;',
		'icon-magnifying-glass': '&#xe905;',
		'icon-menu': '&#xe906;',
		'icon-nature': '&#xe907;',
		'icon-nature-1': '&#xe908;',
		'icon-nature-2': '&#xe909;',
		'icon-people': '&#xe90a;',
		'icon-phone-auricular': '&#xe90b;',
		'icon-plus': '&#xe90c;',
		'icon-minus': '&#xe90d;',
		'icon-star': '&#xe90e;',
		'icon-telephone': '&#xe90f;',
		'icon-transport': '&#xe910;',
		'icon-truck-transport': '&#xe911;',
		'icon-twitter-logo-button': '&#xe912;',
		'icon-facebook-logo-button': '&#xe913;',
		'icon-google-plus': '&#xe914;',
		'icon-instagram-logo': '&#xe915;',
		'icon-social': '&#xe916;',
		'icon-linkedin-logo-button': '&#xe917;',
		'icon-landkeeper': '&#xe918;',
		'icon-wheelbarrow': '&#xe919;',
		'icon-check': '&#xe91a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
