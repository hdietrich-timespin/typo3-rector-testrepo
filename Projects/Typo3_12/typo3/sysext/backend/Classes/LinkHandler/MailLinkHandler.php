<?php

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Backend\LinkHandler;

use Psr\Http\Message\ServerRequestInterface;

/**
 * Link to an email address.
 *
 * @internal This class is a specific LinkHandler implementation and is not part of the TYPO3's Core API.
 */
class MailLinkHandler extends AbstractLinkHandler implements LinkHandlerInterface
{
    /**
     * Parts of the current link
     *
     * @var array
     */
    protected $linkParts = [];

    /**
     * "target" and "rel" are not allowed
     *
     * @var string[]
     */
    protected $linkAttributes = ['title', 'class', 'subject', 'body', 'cc', 'bcc'];

    /**
     * We don't support updates since there is no difference to simply set the link again.
     *
     * @var bool
     */
    protected $updateSupported = false;

    /**
     * Checks if this is the handler for the given link
     *
     * The handler may store this information locally for later usage.
     *
     * @param array $linkParts Link parts as returned from TypoLinkCodecService
     *
     * @return bool
     */
    public function canHandleLink(array $linkParts)
    {
        if (isset($linkParts['url']['email'])) {
            $this->linkParts = $linkParts;
            return true;
        }
        return false;
    }

    /**
     * Format the current link for HTML output
     *
     * @return string
     */
    public function formatCurrentUrl()
    {
        return $this->linkParts['url']['email'];
    }

    /**
     * Render the link handler
     */
    public function render(ServerRequestInterface $request): string
    {
        $this->pageRenderer->loadJavaScriptModule('@typo3/backend/mail-link-handler.js');
        if (is_array($this->linkParts['url'] ?? null)) {
            foreach ($this->linkParts['url'] as $name => $value) {
                $this->view->assign($name, rawurldecode($value));
            }
        }
        return $this->view->render('LinkBrowser/Mail');
    }

    /**
     * @return string[] Array of body-tag attributes
     */
    public function getBodyTagAttributes()
    {
        return [];
    }
}
