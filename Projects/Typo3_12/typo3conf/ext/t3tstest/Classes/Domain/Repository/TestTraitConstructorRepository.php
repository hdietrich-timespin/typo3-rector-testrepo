<?php

namespace HDietrich\Timespin\T3tstest\Domain\Repository;

class TestTraitConstructorRepository extends AbstractRepository
{
    /**
     * @param ConnectionPool $connectionPool
     */
    public function __construct(ConnectionPool $connectionPool)
    {
        parent::__construct($connectionPool);

        $a = [1,2,3];
        $a{0} = 9;
        //do somthing else

    }
}
