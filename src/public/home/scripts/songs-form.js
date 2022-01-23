document.querySelector("#form-search-songs").addEventListener(
	"submit",
	async function(e) {
		e.preventDefault();
		const { target } = e;
		const params = target.elements.q.value;
		// eslint-disable-next-line no-undef
		const res = await axios.get(target.action, { params : { q : params } });
		console.log(res);
	}
);
