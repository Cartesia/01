<?php
/**
 * Created by PhpStorm.
 * User: OaSiis
 * Date: 05/02/2016
 * Time: 11:47
 */

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;


class ApiController extends Controller
{
    public function blocAction(Request $request)
    {

        if($request->getMethod() == 'POST'){
            $blocks = $request->get('blocks');
            $title = $request->get('title');

            if( $blocks != null){
                $nom = 'Newsletter_'.date('dmYis').'.html';
                $filename = 'newsletter/'.$nom;
                $file = file_put_contents($filename, $this->renderView('AppBundle::_structure.html.twig', array(
                    'blocks' => $blocks,
                    'title' => $title,
                )));
                $poids = filesize($filename);
                if($file){
                    header('Content-Type: application/octet-stream');
                    header('Content-Length: '. $poids);
                    header('Content-disposition: attachment; filename='. $nom);
                    header('Pragma: no-cache');
                    header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
                    header('Expires: 0');
                    readfile($filename);
                }
            }else{
                throw $this->createNotFoundException('Fichier non trouvé');
            }
        }

        return new Response();
    }
}