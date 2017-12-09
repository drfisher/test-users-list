import {ready} from 'promisified-dom-events';

import './app.styl';
import Form, {FormInfo} from './components/Form';
import Popup from './components/Popup';

const editUserFormTemplate = require('./templates/editUserForm.pug');
const popupTemplate = require('./templates/popup.pug');
const usersListTemplate = require('./templates/usersList.pug');

const clickHandlers = {
	'js-users-list-next': (e:MouseEvent, target:HTMLElement):void => {
		drawUsersList(target.dataset.url || '');
		e.preventDefault();
	},
	'js-users-list-user': (e:MouseEvent, target:HTMLElement):void => {
		editUser(target.dataset.id || '');
		e.preventDefault();
	}
};

let appCont:HTMLElement;
window.scrollTo(0, 0);

// Entry point
ready.then(() => {
	appCont = document.querySelector('#app') as HTMLElement;

	if (!appCont) {
		throw new Error('App root container is required');
	}

	// handle all clicks in app with one handler
	appCont.addEventListener('click', (e:MouseEvent):void => {
		const handlers = Object.keys(clickHandlers);
		let target = e.target as HTMLElement;

		do {
			handlers.forEach((className:string) => {
				if (target.classList.contains(className)) {
					clickHandlers[className](e, target);
				}
			});
			target = target.parentElement as HTMLElement;
		} while (target && target !== appCont);
	});

	pause(1000).then(() => drawUsersList('/api/users/'));
});

/**
 * Loads and shows a users list
 * @param {string} url
 */
function drawUsersList (url:string):void {
	window.scrollTo(0, 0);
	fetch(url)
		.then(response => response.json())
		.then(json => usersListTemplate(json))
		.then(html => appCont.innerHTML = html)
		.catch(logError);
}

/**
 * Loads user's data and shows a form
 */
function editUser (id:string):void {
	const popup = new Popup({ template: popupTemplate });
	const formPromise = fetch(`/api/user/${id}/`)
		.then(response => response.json())
		// imitation for a slow network to let you see a preloader
		.then(json => pause(500).then(() => json))
		.then(json => {
			const userForm = new Form({
				onSubmit: formData => {
					saveUser(formData).then(response => {
						if (response.success) {
							userForm.destroy();
							popup.destroy();
							updateUser(response.user);
						}
					});
				},
				template: editUserFormTemplate
			}, {
				action: `/api/users/${id}/`,
				user: json
			});
			return userForm.element;
		});
	popup.show(formPromise);
}

/**
 * Updates user is a list
 * @param {object} user
 */
function updateUser (user) {
	const { id, name } = user;
	const userElem = appCont.querySelector(`.js-users-list-user[data-id="${id}"]`);
	if (userElem) {
		(userElem.querySelector('.user__name') as HTMLElement).textContent = name;
		userElem.classList.add('user_updated');
		setTimeout(() => userElem.classList.remove('user_updated'), 1100);
	}
}

/**
 * Saves user's data to a server
 * @param {FormData} formData
 * @returns {Promise}
 */
function saveUser (formData:FormInfo):Promise<any> {
	const { action, method, body } = formData;
	return fetch(action, { method, body })
		.then(response => response.json());
}

/**
 * @param {number} delay
 * @returns {Promise<void>} a promise which resolves after delay
 */
function pause (delay):Promise<void> {
	return new Promise(resolve => {
		setTimeout(resolve, delay);
	});
}

/**
 * Simple error handler
 * @param {Error} err
 */
function logError (err:Error) {
	console.error(err);
}
