/**
 * Changes an element's class status which changes its color.
 *
 * @param {HTMLElement} element
 * The `element` to be changed.
 *
 * @param {{statusOn: string, statusOff: string, deactivate?: boolean}} options
 * An object to configure which status to be toggled or if `element` will be
 * "deactivated". `statusOn` will be toggled when the element is "on" or when it
 * doesn't have `statusOn` AND `statusOff` (for example when it is deactivated).
 * `statusOff` will be toggled when the element is "off" which happens after
 * this function is called when `element.classlist.contains(statusOn) === true`.
 * If `deactivate` is `true`, `element`'s `statusOn` and `statusOff` will be
 * `classlist.remove()` which causes `element` to be "deactivated".
 *
 * @returns {null | element}
 * Returns `sortLabel` or `null` if deactivated.
 *
 * @example
 * ```
 * // Deactivate the active label
 * const activeLabel = displayBrowse.search.sortLabels.activeLabel;
 * toggleStatus(activeLabel, false);
 * ```
 */
export const toggleStatus = (element, {
	statusOn,
	statusOff,
	deactivate = false
}) => {
	const { classList: { remove, contains, toggle } } = element;

	if (deactivate) {
		remove(
			statusOn,
			statusOff
		);

		return null;
	} else if (
		!contains(statusOn) &&
        !contains(statusOff)
	) {
		toggle(statusOn);
	} else {
		toggle(statusOn);
		toggle(statusOff);
	}

	return element;
};

export default toggleStatus;
