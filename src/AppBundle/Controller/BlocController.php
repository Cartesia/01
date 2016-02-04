<?php
/**
 * Created by PhpStorm.
 * User: OaSiis
 * Date: 03/02/2016
 * Time: 17:51
 */
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class BlocController extends Controller
{

    public function indexAction(Request $request)
    {
        $blocs = $this->getDoctrine()->getManager()->getRepository('AppBundle:Events')->findAll();


        // replace this example code with whatever you need
        return $this->render('AppBundle:Default:index.html.twig', array(
            'blocs' => ''
        ));
    }
}