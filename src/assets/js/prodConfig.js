function disabledInspect() {
	document.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
	document.onkeydown = function (e) {
		if (e.keyCode == 123) {
			return false;
		}
		if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
			return false;
		}
		if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
			return false;
		}
		if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
			return false;
		}
		if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
			return false;
		}
	}
}

(function (h, o, t, j, a, r) {
	h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
	h._hjSettings = { hjid: 2918144, hjsv: 6 };
	a = o.getElementsByTagName('head')[0];
	r = o.createElement('script'); r.async = 1;
	r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
	a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');



disabledInspect()


var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
	var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
	s1.async = true;
	s1.src = 'https://embed.tawk.to/625529527b967b11798a49e0/1g0eair39';
	s1.charset = 'UTF-8';
	s1.setAttribute('crossorigin', '*');
	s0.parentNode.insertBefore(s1, s0);
})();

