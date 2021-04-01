(function (window) {
    'use strict';
    var config = {
        apiKey: "AIzaSyAL6A27IoFwjxh1xxjZeO-a968SvHUxnzA",
        projectId: "coffeeorder-7ef83",
    };

    var baseURL = "https://firestore.googleapis.com/v1/projects/coffeeorder-7ef83/databases/(default)/documents/coffeeorder";

    var App = window.App || {};
    var $ = window.jQuery;
    var idToken;

    class RemoteDataStore {
        constructor() {
            this.setID(config['apiKey']);
        }

        //--------------
        add(key, val) {
            $.ajax({
                type: 'PATCH',
                url: baseURL + key + '?updateMask.fieldPaths-key',
                contentType: 'application/json',
                processData: false,
                dataType: 'json',
                data: JSON.stringify({
                    //"name": val['coffee'],
                    'fields': {
                        'key': {
                            'mapValue': {
                                'fields': {
                                    'coffee': {'stringValue': val['coffee']},
                                    'email': {'stringValue': val['emailAddress']},
                                    'flavor': {'stringValue': val['flavor']},
                                    'size': {'stringValue': val['size']},
                                    'strength': {'stringValue': val['strength']}
                                }
                            }
                        }
                    }
                }),

                success: function(serverResponse) {console.log(serverResponse)},
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + idToken)
                }
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

    RemoteDataStore.prototype.setID = function(api) {
        $.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + api, {'returnSecureToken': true}, function(serverResponse) {
            idToken = serverResponse['idToken'];
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);