<?php

declare(strict_types=1);

namespace HDietrich\Timespin\T3tstest\Domain\Repository;

use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\Repository;

/**
 * This file is part of the "t3tstest" Extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * (c) 2022
 */

/**
 * Testclass for https://github.com/sabbelasichon/typo3-rector/issues/4196
 *
 * Test with:
 *
    cd /path_to/hdietrich-timespin/typo3-rector-testrepo2
    composer install
    cd Projects/Typo3_12
    php ../../vendor/bin/rector  process typo3conf/ext/t3tstest/Classes/Domain/Repository --dry-run -vvv --debug
  */
class Typo3RectorIssue4196Repository extends Repository
{

    public function search()
    {
        /** @var QueryBuilder $queryBuilder */
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getQueryBuilderForTable('table');

        $or = $queryBuilder->expr()->or();

        $or->add($queryBuilder->expr()->eq('znumber', ":search"))
            ->add($queryBuilder->expr()->eq('type', ":search"))
            ->add($queryBuilder->expr()->like('first_name', ":likeSearch"))
            ->add($queryBuilder->expr()->like('last_name', ":likeSearch"))
        ;
        /** rector changed to:

               (
                   (
                       (
                            $or = $or->with($queryBuilder->expr()->eq('znumber', ":search"))
                       ) = (
                               $or = $or->with($queryBuilder->expr()->eq('znumber', ":search"))
                       )->with($queryBuilder->expr()->eq('type', ":search"))
                   ) = (
                       $or->add($queryBuilder->expr()->eq('znumber', ":search"))
                           = ($or = $or->with($queryBuilder->expr()->eq('znumber', ":search")))
                           ->with($queryBuilder->expr()->eq('type', ":search"))
                   )->with($queryBuilder->expr()->like('first_name', ":likeSearch"))
               ) = ($or->add($queryBuilder->expr()->eq('znumber', ":search"))
                       ->add($queryBuilder->expr()->eq('type', ":search"))
                       = (
                            $or->add($queryBuilder->expr()->eq('znumber', ":search"))
                            = ($or = $or->with($queryBuilder->expr()->eq('znumber', ":search")))
                                ->with($queryBuilder->expr()->eq('type', ":search"))
                        )->with($queryBuilder->expr()->like('first_name', ":likeSearch"))
               )->with($queryBuilder->expr()->like('last_name', ":likeSearch"));
        */



        $or2 = $queryBuilder->expr()->or();

        $or2->add($queryBuilder->expr()->eq('znumber', ":search"));
        $or2->add($queryBuilder->expr()->eq('type', ":search"));
        $or2->add($queryBuilder->expr()->like('first_name', ":likeSearch"));
        $or2->add($queryBuilder->expr()->like('last_name', ":likeSearch"));

        /** @var redtor chengt to
         *
         *
        +        $or2 = $or->with($queryBuilder->expr()->eq('znumber', ":search"));
        +        $or2 = $or->with($queryBuilder->expr()->eq('type', ":search"));
        +        $or2 = $or->with($queryBuilder->expr()->like('first_name', ":likeSearch"));
        +        $or2 = $or->with($queryBuilder->expr()->like('last_name', ":likeSearch"));
         */


        return $queryBuilder->execute();
    }

}

