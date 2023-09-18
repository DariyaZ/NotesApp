const DB_NAME = 'notesdb';
const DB_VERSION = 1;
let DB: any;

export default {
    async getDb() {
		return new Promise((resolve, reject) => {
			if (DB) { return resolve(DB); }

			let request = indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				let db = e.target.result;
				db.createObjectStore("notes", { autoIncrement: true, keyPath:'id' });
			};
		});
	},
    async deleteNote(id) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['notes'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('notes');
			store.delete(id);
		});	
	},
	async getNotes() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['notes'],'readonly');
			trans.oncomplete = () => {
				resolve(notes);
			};
			
			let store = trans.objectStore('notes');
			let notes = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					notes.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveNote(note) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['notes'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};


			let store = trans.objectStore('notes');
			store.put(note);

		});
	
	}
}