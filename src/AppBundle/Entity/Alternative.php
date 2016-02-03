<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Alternative
 *
 * @ORM\Table(name="alternative")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\AlternativeRepository")
 */
class Alternative
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
     * @ORM\Column(name="title", type="text")
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Events")
     * @ORM\JoinColumn(nullable=false)
     */
    private $event;

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
     * Set content
     *
     * @param string $content
     * @return Alternative
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set event
     *
     * @param \AppBundle\Entity\Events $event
     * @return Alternative
     */
    public function setEvent(\AppBundle\Entity\Events $event)
    {
        $this->event = $event;

        return $this;
    }

    /**
     * Get event
     *
     * @return \AppBundle\Entity\Events 
     */
    public function getEvent()
    {
        return $this->event;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Alternative
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }
}
