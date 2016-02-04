<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * BlocRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class BlocRepository extends EntityRepository
{
    public function getBlocsByTemplate($template)
    {
        return $this->createQueryBuilder('b')
            ->leftJoin('b.templates', 't')
            ->where('t = :template')
            ->setParameter('template', $template)
            ->getQuery()->getResult()
        ;


    }
}
