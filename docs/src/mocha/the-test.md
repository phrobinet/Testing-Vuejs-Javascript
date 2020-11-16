# LE RÉPERTOIRE `TEST`

Par défaut, `mocha` cherche le glob `"./test/*.js"`, donc vous pouvez mettre vos tests dans le dossier `test/`. Si vous voulez inclure des sous-répertoires, passez l'option `--recursive`.

Pour configurer l'endroit où `mocha` cherche les tests, vous pouvez passer votre propre glob :

```
$ mocha --recursive "./spec/*.js"
```

Certains shells supportent la correspondance récursive en utilisant le joker globstar (`**`). Bash >= 4.3 supporte cette option avec l'option [globstar](https://www.gnu.org/software/bash/manual/html_node/The-Shopt-Builtin.html) qui [doit être activée](https://github.com/mochajs/mocha/pull/3348#issuecomment-383937247) pour obtenir les mêmes résultats que l'option `--récursive' ([ZSH](http://zsh.sourceforge.net/Doc/Release/Expansion.html#Recursive-Globbing) et [Fish](https://fishshell.com/docs/current/#expand-wildcard) supportent cette option par défaut). Lorsque la correspondance récursive est activée, les résultats suivants sont identiques à ceux obtenus en passant l'option `--recursive` :

```
$ mocha "./spec/**/*.js"
```
[Vous devez toujours citer vos globs dans les scripts npm](https://medium.com/@jakubsynowiec/you-should-always-quote-your-globs-in-npm-scripts-621887a2a784). Si vous utilisez des guillemets doubles, c'est le shell sous UNIX qui va étendre le glob. En revanche, si vous utilisez des guillemets simples, le module [node-glob](https://www.npmjs.com/package/glob) se chargera de son expansion.

Voir ce [tutoriel](https://gist.github.com/reggi/475793ea1846affbcfe8) sur l'utilisation des globes.

Note : Les guillemets doubles autour du globe sont recommandés pour la portabilité.

