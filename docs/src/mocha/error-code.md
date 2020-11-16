# ERROR CODES

>Nouveau dans la v6.0.0

Lorsque Mocha lui-même lance une exception, l'"erreur" associée aura une propriété "code". Le cas échéant, les consommateurs doivent vérifier la propriété "code" au lieu de la faire correspondre à la propriété "message". Le tableau suivant décrit ces codes d'erreur :

Code	Description
ERR_MOCHA_INVALID_ARG_TYPE	type incorrect a été passé pour un argument donné
ERR_MOCHA_INVALID_ARG_VALUE	valeur invalide ou non prise en charge a été passée pour un argument donné
ERR_MOCHA_INVALID_EXCEPTION	une exception fallacieuse ou autrement sous-exposée a été faite
ERR_MOCHA_INVALID_INTERFACE	interface spécifiée dans les options non trouvées
ERR_MOCHA_INVALID_REPORTER	déclarant spécifié dans les options non trouvées
ERR_MOCHA_NO_FILES_MATCH_PATTERN	Le(s) fichier(s) test n'ont pas été trouvés
ERR_MOCHA_UNSUPPORTED		le comportement, l'option ou le paramètre demandé n'est pas pris en charge

