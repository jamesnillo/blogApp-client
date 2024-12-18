import { Card, Button } from 'react-bootstrap';
import { useState } from'react';

import { Link } from 'react-router-dom';

export default function BlogCard({blogProp}) {

    const { title, content, username } = blogProp;
 
    return (
        <Card className = "my-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>Content:</Card.Subtitle>
                <Card.Text>{content}</Card.Text>
                <Card.Text>{username}</Card.Text>

                <Link className="btn btn-primary" to = {`/post/${_id}`}>Details</Link>                
            </Card.Body>
        </Card>
    )
}