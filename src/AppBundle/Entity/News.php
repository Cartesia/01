<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * News
 *
 * @ORM\Table(name="news")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\NewsRepository")
 */
class News
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\NewsBloc", mappedBy="news", cascade={"persist"})
     */
    private $newsbloc;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return News
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->newsbloc = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add newsbloc
     *
     * @param \AppBundle\Entity\NewsBloc $newsbloc
     * @return News
     */
    public function addNewsbloc(\AppBundle\Entity\NewsBloc $newsbloc)
    {
        $this->newsbloc[] = $newsbloc;

        return $this;
    }

    /**
     * Remove newsbloc
     *
     * @param \AppBundle\Entity\NewsBloc $newsbloc
     */
    public function removeNewsbloc(\AppBundle\Entity\NewsBloc $newsbloc)
    {
        $this->newsbloc->removeElement($newsbloc);
    }

    /**
     * Get newsbloc
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getNewsbloc()
    {
        return $this->newsbloc;
    }
}
