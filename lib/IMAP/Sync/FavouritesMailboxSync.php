<?php

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

namespace OCA\Mail\IMAP\Sync;

use Horde_Imap_Client_Base;
use Horde_Imap_Client_Data_Sync;
use OCA\Mail\Model\IMAPMessage;

class FavouritesMailboxSync extends SimpleMailboxSync {

	public function getNewMessages(Horde_Imap_Client_Base $imapClient,
		Request $syncRequest, Horde_Imap_Client_Data_Sync $hordeSync) {
		$newMessages = parent::getNewMessages($imapClient, $syncRequest, $hordeSync);

		return array_filter($newMessages, function(IMAPMessage $message) {
			$flags = $message->getFlags();
			return isset($flags['flagged']) && $flags['flagged'];
		});
	}

}