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
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="text")
     */
    private $content;

    /**
     * @ORM\Column(name="editable", type="boolean")
     */
    private $editable;

    /**
     * @ORM\ManyToOne(targetEntity="Template", inversedBy="blocs")
     * @ORM\JoinColumn(name="template_id", nullable=false)
     */
    private $template;

    /**
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\NewsBloc", mappedBy="bloc", cascade={"persist"})
     */
    private $newsbloc;

    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->newsbloc = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set title
     *
     * @param string $title
     * @return Bloc
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

    /**
     * Set content
     *
     * @param string $content
     * @return Bloc
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
     * Set editor
     *
     * @param boolean $editable
     * @return Bloc
     */
    public function setEditable($editable)
    {
        $this->editable = $editable;

        return $this;
    }

    /**
     * Get editable
     *
     * @return boolean 
     */
    public function getEditable()
    {
        return $this->editable;
    }

    /**
     * Set template
     *
     * @param \AppBundle\Entity\Template $template
     * @return Bloc
     */
    public function setTemplate(\AppBundle\Entity\Template $template)
    {
        $this->template = $template;

        return $this;
    }

    /**
     * Get template
     *
     * @return \AppBundle\Entity\Template
     */
    public function getTemplate()
    {
        return $this->template;
    }

   
    /**
     * Add newsbloc
     *
     * @param \AppBundle\Entity\NewsBloc $newsbloc
     * @return Bloc
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

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->title;
    }

}
