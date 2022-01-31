const displayComments = {
	form : {
		cancel  : document.querySelector("#form-new-comment .comment-delete"),
		confirm : document.querySelector("#form-new-comment .comment-confirm"),
		element : document.getElementById("form-new-comment"),
	},
	render : {
		container : document.getElementById("display-comments-render"),

		/**
		 * Render comments and check the current user's authorization to manipulate
		 * them.
		 *
		 * @param {object} user
		 * A user document for authorization.
		 *
		 * @param {...import("../../../models/comment.js").CommentDocument} commentArr
		 * A `CommentDocument` array of the current `Song`.
		 */
		renderComments(user, ...commentArr) {
			for (const comment of commentArr) {
				console.log(comment.user._id === user._id);
				const newComment = this.template.cloneNode(true);
				newComment.querySelector("textarea").innerText = comment.text;
				newComment.querySelector(".comment-username").innerText = comment.user.username;
				this.container.append(newComment);
			}
		},
		template : document.getElementById("comment-template").content.firstElementChild,
	}
};

export default displayComments;
// TODO figure out how to check if current user is auth