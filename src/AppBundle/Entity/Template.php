<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Template
 *
 * @ORM\Table(name="template")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\TemplateRepository")
 */
class Template
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
     * @ORM\Column(name="subtitle", type="string", length=255)
     */
    private $subtitle;

    /**
     * @var string
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    private $href;

    /**
     * @ORM\OneToMany(targetEntity="Bloc", mappedBy="template")
     */
    private $blocs;

    /**
     * @ORM\ManyToMany(targetEntity="Brand", mappedBy="templates")
     */
    private $brands;

    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->blocs = new \Doctrine\Common\Collections\ArrayCollection();
        $this->brands = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @return Template
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
     * Set subtitle
     *
     * @param string $subtitle
     * @return Template
     */
    public function setSubtitle($subtitle)
    {
        $this->subtitle = $subtitle;

        return $this;
    }

    /**
     * Get subtitle
     *
     * @return string 
     */
    public function getSubtitle()
    {
        return $this->subtitle;
    }

    /**
     * Set href
     *
     * @param string $href
     * @return Template
     */
    public function setHref($href)
    {
        $this->href = $href;

        return $this;
    }

    /**
     * Get href
     *
     * @return string 
     */
    public function getHref()
    {
        return $this->href;
    }

    /**
     * Add blocs
     *
     * @param \AppBundle\Entity\Bloc $blocs
     * @return Template
     */
    public function addBloc(\AppBundle\Entity\Bloc $blocs)
    {
        $this->blocs[] = $blocs;

        return $this;
    }

    /**
     * Remove blocs
     *
     * @param \AppBundle\Entity\Bloc $blocs
     */
    public function removeBloc(\AppBundle\Entity\Bloc $blocs)
    {
        $this->blocs->removeElement($blocs);
    }

    /**
     * Get blocs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBlocs()
    {
        return $this->blocs;
    }

    /**
     * Add brands
     *
     * @param \AppBundle\Entity\Brand $brands
     * @return Template
     */
    public function addBrand(\AppBundle\Entity\Brand $brands)
    {
        $this->brands[] = $brands;

        return $this;
    }

    /**
     * Remove brands
     *
     * @param \AppBundle\Entity\Brand $brands
     */
    public function removeBrand(\AppBundle\Entity\Brand $brands)
    {
        $this->brands->removeElement($brands);
    }

    /**
     * Get brands
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBrands()
    {
        return $this->brands;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->title;
    }
}
