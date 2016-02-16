<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class TemplateAdmin extends Admin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Template')
                ->add('title', null, array('label' => 'Titre'))
                ->add('description')
                ->add('connection', 'entity', array(
                    'class' => 'AppBundle\Entity\Brand',
                    'property' => 'name',
                ))
                ->add('slug')
            ->end()
        ;
    }
    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('title', null, array('label' => 'Titre'))
            ->add('brands', null, array('label' => 'Marque'))
        ;
    }
    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('title', null, array('label' => 'Titre'))
            ->add('brands', null, array('label' => 'Marques'))
            ->add('_action', 'actions', [
                'actions' => [
                    'show'   => [],
                    'edit'   => [],
                ],
            ])
        ;
    }
    protected function configureShowFields(ShowMapper $showMapper)
    {
        // Fields to be shown on show action
        $showMapper
            ->add('title', null, array('label' => 'Titre'))
            ->add('description')
            ->add('brands', null, array('label' => 'Marque'))
            ->add('blocs', 'textarea', array('label' => 'Contenu',))
            ->add('slug')
        ;
    }
}
