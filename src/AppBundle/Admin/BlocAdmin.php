<?php

namespace AppBundle\Admin;
use Sonata\AdminBundle\Admin\Admin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;

class BlocAdmin extends Admin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->add('content', null, array('label' => 'Code HTML'))
            ->add('title', null, array('label' => 'Nom de la variante', 'required' => false))
            ->add('template')
            ->add('editable')
        ;
    }
    // Fields to be shown on filter forms
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('template')
        ;
    }
    // Fields to be shown on lists
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->add('template')
            ->add('title')
            ->add('editable')
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
            ->add('content')
            ->add('title')
            ->add('template')
            ->add('editable')
        ;
    }

}
