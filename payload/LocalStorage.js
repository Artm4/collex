export class LocalStorage
{
    static 
    /**
    * @type {String}
    */ 
    personName = "Guest";
    static 
    /**
    * @type {Long}
    */ 
    personId = 0;

    static 
    /**
    * @type {String}
    */ 
    storeName = "n/a";
    static 
    /**
    * @type {String}
    */ 
    token = "";


    clear()
    {
        LocalStorage.personId = 0;
        LocalStorage.personName = "Guest";
        LocalStorage.token = "";
    }

}