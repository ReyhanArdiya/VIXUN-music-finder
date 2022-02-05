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
				let newComment;

				if (comment.user._id === user._id) {
					newComment = this.templateEditable.cloneNode(true);

					const deleteButt = newComment.querySelector(".comment-delete");
					const confirmButt = newComment.querySelector(".comment-confirm");

					deleteButt.addEventListener("submit", async function(e) {
						e.preventDefault();
						e.stopPropagation();

						await axios.delete(`${window.location.pathname}/comments/${comment._id}`);
						newComment.remove();
					});

					confirmButt.addEventListener("submit", async function(e) {
						e.preventDefault();
						e.stopPropagation();
						const commentText = newComment.querySelector(".comment-text");
						const updateComment = (await axios.patch(
							`${window.location.pathname}/comments/${comment._id}`,
							{ text : commentText.value }
						)).data;

						commentText.value = updateComment.text;
					});
				} else {
					newComment = this.templateFixed.cloneNode(true);
				}

				newComment.querySelector(".comment-text").innerText = comment.text;
				newComment.querySelector(".comment-username").innerText = comment.user.username;
				this.container.append(newComment);
			}
		},
		templateEditable : document.getElementById("comment-template-editable").content.firstElementChild,
		templateFixed    : document.getElementById("comment-template-fixed").content.firstElementChild
	}
};

export default displayComments;