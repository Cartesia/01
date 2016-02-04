<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Bloc
 *
 * @ORM\Table(name="bloc")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BlocRepository")
 */
class Bloc
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
     * @ORM\OneToMany(targetEntity="Alternative", mappedBy="bloc")
     */
    private $alternatives;

    /**
     * @ORM\ManyToMany(targetEntity="Template", mappedBy="blocs")
     */
    private $templates;

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
     * Constructor
     */
    public function __construct()
    {
        $this->alternatives = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add alternatives
     *
     * @param \AppBundle\Entity\Alternative $alternatives
     * @return Bloc
     */
    public function addAlternative(\AppBundle\Entity\Alternative $alternatives)
    {
        $this->alternatives[] = $alternatives;

        return $this;
    }

    /**
     * Remove alternatives
     *
     * @param \AppBundle\Entity\Alternative $alternatives
     */
    public function removeAlternative(\AppBundle\Entity\Alternative $alternatives)
    {
        $this->alternatives->removeElement($alternatives);
    }

    /**
     * Get alternatives
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getAlternatives()
    {
        return $this->alternatives;
    }

    /**
     * Add templates
     *
     * @param \AppBundle\Entity\Template $templates
     * @return Bloc
     */
    public function addTemplate(\AppBundle\Entity\Template $templates)
    {
        $this->templates[] = $templates;

        return $this;
    }

    /**
     * Remove templates
     *
     * @param \AppBundle\Entity\Template $templates
     */
    public function removeTemplate(\AppBundle\Entity\Template $templates)
    {
        $this->templates->removeElement($templates);
    }

    /**
     * Get templates
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTemplates()
    {
        return $this->templates;
    }
}
