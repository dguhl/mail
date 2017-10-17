/* global spyOn */

/**
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * Mail
 *
 * This code is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License, version 3,
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

define(['models/account',
	'models/foldercollection',
	'models/aliasescollection',
	'models/folder',
	'OC'
], function(Account, FolderCollection, AliasCollection, Folder, OC) {
	describe('Account test', function() {
		var account;

		beforeEach(function() {
			account = new Account();
		});

		it('has collections as default attributes', function() {
			var folders = account.folders;
			var aliases = account.get('aliases');

			expect(folders instanceof FolderCollection).toBe(true);
			expect(aliases instanceof AliasCollection).toBe(true);
		});

		it('uses accountId as id attribute', function() {
			expect(account.idAttribute).toBe('accountId');
		});

		it('has the correct URL', function() {
			spyOn(OC, 'generateUrl').and.returnValue('index.php/apps/mail/api/accounts');

			var url = account.url();

			expect(url).toBe('index.php/apps/mail/api/accounts');
		});

		it('adds folders to its collection', function() {
			var folder = new Folder();

			account.addFolder(folder);

			expect(account.folders.length).toBe(1);
			expect(folder.account).toBe(account);
		});
	});
});