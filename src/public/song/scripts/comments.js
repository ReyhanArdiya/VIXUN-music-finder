const displayComments = {
	form   : document.getElementById("form-new-comment"),
	render : {
		container : document.getElementById("display-comments-render"),

		/**
		 *
		 * @param {import("../../../models/comment.js").CommentDocument[]} commentArr
		 * A `CommentDocument` array of the current `Song`.
		 */
		renderComments(commentArr) {
			for (const comment of commentArr) {
				const newComment = this.template.cloneNode(true);
				console.log(comment, newComment);
				newComment.querySelector("textarea").innerText = comment.text;
				// newComment.getElementById("username").innerText = comment.user.username;
				this.container.append(newComment);
			}
		},
		template : document.getElementById("comment-template").content.firstElementChild,
	}
};

export default displayComments;