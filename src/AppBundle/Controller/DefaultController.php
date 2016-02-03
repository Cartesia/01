<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Events;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $events = $this->getDoctrine()->getManager()->getRepository('AppBundle:Events')->findAll();

        $alternatives = $this->getDoctrine()->getManager()->getRepository('AppBundle:Alternative')->findAll();

        // replace this example code with whatever you need
        return $this->render('AppBundle:Default:index.html.twig', array(
            'events' => $events,
            'alternatives' => $alternatives
        ));
    }
}
