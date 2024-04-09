INFO
====

This is a project wich test https://github.com/sabbelasichon/typo3-rector

Checkout
```
git clone https://github.com/hdietrich-timespin/typo3-rector-testrepo.git /path_to_typo3-rector-testrepo
```

```
cd /path_to_typo3-rector-testrepo
```

Install
```
composer install
```

Go to project sources wich has contain a rector.php
```
cd Projects/Typo3_12
```

Start rector process with:
```
php ../../vendor/bin/rector  process typo3conf/ext/t3tstest/Classes --dry-run -vvv --debug
```