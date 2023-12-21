<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Validator;

class PostController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return Post::all();
    }
    
    /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function create()
    {
        //
    }
    
    /**
    * Store a newly created resource in storage.
    *
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    */
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => ["required"],
                'body' => ["required"],
                ]
            );
            
            if ($validator ->fails()) {
                return [
                    'status' => false,
                    'error' => $validator -> messages(),
                ];               
            }
            // для upload image
            if($request -> file()){
                $file_name = time().'_'.$request->image->getClientOriginalName();
                // отправляет в storage/app/public/uploads для правильного пути в БД
                $file_path = $request ->file('image')->storeAs('uploads', $file_name, 'public');
                // отправляет в public/uploads для показа в компоненте
                $file_path_public = $request ->file('image')->move(public_path ('uploads'), $file_name);
                $image = '/' . $file_path; 
            }

            $post = Post::create([
                'title' => $request -> title,
                'body' => $request -> body,
                'image' => $image,        
                // fake image from api
                // 'image' => 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
            ]);
            
            return [
                'status' => true,
                'post' => $post,
            ];
        }
        
        /**
        * Display the specified resource.
        *
        * @param  \App\Models\Post  $post
        * @return \Illuminate\Http\Response
        */
        public function show(Post $post)
        {   
            // если не использовать first то возврщает массив
            return Post::find($post)->first();
        }
        
        /**
        * Show the form for editing the specified resource.
        *
        * @param  \App\Models\Post  $post
        * @return \Illuminate\Http\Response
        */
        public function edit(Post $post)
        {
            //
        }
        
        /**
        * Update the specified resource in storage.
        *
        * @param  \Illuminate\Http\Request  $request
        * @param  \App\Models\Post  $post
        * @return \Illuminate\Http\Response
        */
        public function update(Request $request, Post $post)
        {
            $validator = Validator::make(
                $request->all(),
                [
                    'title' => ["required"],
                    'body' => ["required"],
                    ]
                );
                
                if ($validator ->fails()) {
                    return [
                        'status' => false,
                        'error' => $validator -> messages(),
                    ];               
                }

                // если не использовать first то возврщает массив и не работает
                $post = Post::find($post)->first();
                $post->title =  $request->input('title');
                $post->body =  $request->input('body');  
                //  вроде еще можно update() использовать 
                $post->save();  
                return [
                    'status' => true,
                    'post' => $post,
                ];
            }
            
            /**
            * Remove the specified resource from storage.
            *
            * @param  \App\Models\Post  $post
            * @return \Illuminate\Http\Response
            */
            public function destroy(Post $post)
            {               
                return $post->delete();                 
            }

             /**
            * Search my_custom method.
            *
            * @param  \App\Models\Post  $post
            * @param  str $searchQuery from API: get('/posts/search/{search}'
            * @return \Illuminate\Http\Response
            */
            public function search(Post $post, $searchQuery)
            {   
                $searchResult = Post::where('title','LIKE',"%{$searchQuery}%")->get();
                return $searchResult;                               
            }

        }
        