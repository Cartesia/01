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
     * @ORM\Column(name="connection", type="string", length=255)
     */
    private $connection;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="slug", type="string", length=255)
     */
    private $slug;

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
     * Set connection
     *
     * @param string $connection
     * @return Template
     */
    public function setConnection($connection)
    {
        $this->connection = $connection;

        return $this;
    }

    /**
     * Get connection
     *
     * @return string
     */
    public function getConnection()
    {
        return $this->connection;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Template
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set href
     *
     * @param string $slug
     * @return Template
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string 
     */
    public function getSlug()
    {
        return $this->slug;
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
        return $this->title.' - '.$this->connection;
    }


}
