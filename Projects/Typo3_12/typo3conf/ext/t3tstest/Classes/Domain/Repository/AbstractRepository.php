<?php

namespace HDietrich\Timespin\T3tstest\Domain\Repository;

use TYPO3\CMS\Extbase\Persistence\Repository;
use HDietrich\Timespin\T3tstest\Domain\Repository\Traits\BaseRepositoryTrait;

abstract class AbstractRepository extends Repository
{
    use BaseRepositoryTrait;
}
