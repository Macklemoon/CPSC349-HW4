(function (window) {
    'use strict';
    var config = {
        projectId: "coffeeorder-7ef83"
    };

    var baseURL = "https://firestore.googleapis.com/v1/projects/coffeeorder-7ef83/databases/(default)/documents/coffeeorder";

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {
        constructor() {
        }

        //--------------
        add(key, val) {
            $.ajax({
                type: 'PATCH',
                url: baseURL + '/' + key,
                contentType: 'application/json',
                processData: false,
                data: JSON.stringify({
                    //"name": val['coffee'],
                    'fields': {
                        'key': {
                            'mapValue': {
                                'fields': {
                                    'coffee': {'stringValue': val['coffee']},
                                    'emailAddress': {'stringValue': val['emailAddress']},
                                    'flavor': {'stringValue': val['flavor'] || ''},
                                    'size': {'stringValue': val['size'] || ''},
                                    'strength': {'stringValue': val['strength'] || ''}
                                }
                            }
                        }
                    }
                }),
                success: function(serverResponse) {console.log(serverResponse)},
            });
        };
        //--------------
        get(key) {
            $.get(baseURL + '/' + key, function(serverResponse){
                console.log(serverResponse);
            });
        }
        //--------------
        getAll() { 
            $.get(baseURL, function(serverResponse){
                console.log(serverResponse);
            });
        }
        //--------------
        remove(key) {
            $.ajax({ type: 'DELETE', url: baseURL + '/' + key });
        }
        //--------------
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);