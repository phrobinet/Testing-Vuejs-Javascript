# APERÇU DU CYCLE DE FONCTIONNEMENT

Un bref aperçu de l'ordre dans lequel les composants de Mocha sont exécutés. Il faut noter que tous les hooks, `describe` et `it` callbacks sont exécutés dans l'ordre où ils sont définis (c'est-à-dire trouvés dans le fichier).

``` js
run 'mocha spec.js'
|
spawn child process
|
|--------------> inside child process
  process and apply options
  |
  run spec file/s
  |
  |--------------> per spec file
    suite callbacks (e.g., 'describe')
    |
    'before' root-level pre-hook
    |
    'before' pre-hook
    |
    |--------------> per test
      'beforeEach' root-level pre-hook
      |
      'beforeEach' pre-hook
      |
      test callbacks (e.g., 'it')
      |
      'afterEach' post-hook
      |
      'afterEach' root-level post-hook
    |<-------------- per test end
    |
    'after' post-hook
    |
    'after' root-level post-hooks
  |<-------------- per spec file end
|<-------------- inside child process end
``` 

