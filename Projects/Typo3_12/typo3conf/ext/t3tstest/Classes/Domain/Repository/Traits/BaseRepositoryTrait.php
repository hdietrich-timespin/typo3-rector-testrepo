<?php


namespace HDietrich\Timespin\T3tstest\Domain\Repository\Traits;


use TYPO3\CMS\Core\Database\ConnectionPool;

trait BaseRepositoryTrait
{
    /**
     * @param ConnectionPool $connectionPool
     */
    public function __construct(ConnectionPool $connectionPool)
    {
        $this->connectionPool = $connectionPool;
    }
}
