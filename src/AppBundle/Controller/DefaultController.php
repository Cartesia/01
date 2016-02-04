<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DefaultController extends Controller
{

    public function indexAction(Request $request)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $slug = $request->get('slug_brand');

        $brand = $em->getRepository('AppBundle:Brand')->findOneBySlug($slug);

        if(!$brand){
            throw new NotFoundHttpException("existe pas");
        }

        $templates = $em->getRepository('AppBundle:Template')->getTemplatesByBrand($brand);
        $arrayTemplates = [];

        foreach($templates as $template){
            $listBlocs = $em->getRepository('AppBundle:Bloc')->getBlocsByTemplate($template);
            $arrayTemplates[$template->getId()]['template'] = $template ;
            $arrayTemplates[$template->getId()]['blocs'] = $listBlocs ;
        }

        // replace this example code with whatever you need
        return $this->render('AppBundle:Default:index.html.twig', array(
            'arrayTemplates' => $arrayTemplates,
        ));
    }
}
