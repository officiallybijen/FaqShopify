<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Faq;
use Error;
use Exception;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($store_id)
    {
        $data = Faq::where('store_id', $store_id)->paginate(5);
        return [
            "status" => 200,
            "data" => $data,
            "msg" => "Faq fetched successfully"
        ];
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
        try {
            $title = $request->meta['title'];
            $faq = new Faq();
            $faq->store_id = $request->meta['store_id'];
            $faq->content_title = $title;
            $faq->save();
            //$faq->id;
            $content = new Content();
            $content->content = json_encode($request->data);
            $content->faq_id = $faq->id;
            $content->save();
            return [
                "status" => 201,
                "data" => [
                    "faq_id" => $faq->id,
                    "content_id" => $content->id,
                ],
                "msg" => "Content Fetched"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $faq = Faq::find($id);
            $data = $faq->content;
            return [
                "status" => 200,
                "title" => $faq->content_title,
                "data" => json_decode($data->content),
                "msg" => "Content fetched successfully"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $title = $request['title'];
            $faq = Faq::find($id);
            $faq->content_title = $title;
            $faq->save();
            return [
                "status" => 200,
                "data" => $faq,
                "msg" => "Faq updated successfully"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Faq  $faq
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Faq::find($id)->delete();
            return [
                "status" => 200,
                "data" => [
                    "faq_id" => $id
                ],
                "msg" => "Faq deleted successfully"
            ];
        } catch (Exception $e) {
            return response(["msg" => $e->getMessage()], 400);
        } catch (Error $e) {
            return response(["msg" => $e->getMessage()], 400);
        }
    }
}
