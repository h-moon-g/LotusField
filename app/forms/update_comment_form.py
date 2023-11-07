from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class UpdateCommentForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired(), Length(1,300)])
    comment_id = IntegerField("Comment ID", validators=[DataRequired()])
