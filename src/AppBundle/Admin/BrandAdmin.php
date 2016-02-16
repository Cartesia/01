<?php

namespace AppBundle\Admin;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class BrandAdmin extends Admin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('Marque')
                ->add('name', null, array('label' => 'Nom'))
                ->add('slug')
            ->end()
        ;
    }

    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('name', null, array('label' => 'Nom'))
            ->add('_action', 'actions', [
                'actions' => [
                    'show'   => [],
                    'edit'   => [],
                    'delete' => []
                ],
            ])
        ;
    }
    protected function configureShowFields(ShowMapper $showMapper)
    {
        // Fields to be shown on show action
        $showMapper
            ->with('Marque')
                ->add('name', null, array('label' => 'Nom'))
                ->add('slug')
                ->add('templates', null, array('label' => 'Liste des templates'))
            ->end()
        ;
    }
}
