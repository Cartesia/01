<?php
/**
 * Created by PhpStorm.
 * User: OaSiis
 * Date: 05/02/2016
 * Time: 11:47
 */

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;


class ApiController extends Controller
{
    public function blocAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $id = $request->get('id');

        $bloc = $em->getRepository('AppBundle:Bloc')->findApi($id);

        return new JsonResponse($bloc);

    }
}